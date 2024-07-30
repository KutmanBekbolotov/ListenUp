import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import BiteComponent from './biteComponent';
import './bite.css';
import Sidebar from '../sidebar';

const BitePage = () => {
  const [nickname, setNickname] = useState('');
  const [emotion, setEmotion] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUsers = async () => {
        try {
          const usersCollectionRef = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollectionRef);
          const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(usersList);
        } catch (e) {
          console.error('Ошибка получения пользователей: ', e);
        }
      };

      const checkNickname = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setNickname(userDoc.data().nickname || '');
          }
        } catch (e) {
          console.error('Ошибка проверки никнейма: ', e);
        }
      };

      fetchUsers();
      checkNickname();
    }
  }, [user]);

  const handleUpdateNickname = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, { nickname }, { merge: true });
        } else {
          await updateDoc(userDocRef, { nickname });
        }
        alert('Никнейм обновлен!');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleSendEmotion = async () => {
    if (!recipientId) {
      setError('Выберите получателя!');
      return;
    }
    if (!emotion) {
      setError('Выберите эмоцию!');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const friends = userDoc.data().friends || [];
      if (!friends.includes(recipientId)) {
        setError('Вы не можете отправить эмоцию этому пользователю.');
        return;
      }

      await addDoc(collection(db, 'biteEmotions'), {
        senderId: user.uid,
        recipientId: recipientId,
        emotion: emotion,
        timestamp: new Date(),
      });
      alert('Эмоция отправлена!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bite-page">
      <h2>Эмоции укусов</h2>
      <Sidebar />

      {!nickname ? (
        <div className="update-nickname">
          <h3>Создайте имя пользователя</h3>
          <form onSubmit={handleUpdateNickname}>
            <input
              type="text"
              placeholder="Введите ваш никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <button type="submit">Создать никнейм</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="send-emotion">
          <h3>Отправьте эмоцию укуса</h3>
          <BiteComponent
            emotion={emotion}
            setEmotion={setEmotion}
            recipientId={recipientId}
            setRecipientId={setRecipientId}
            users={users}
            handleSendEmotion={handleSendEmotion}
            error={error}
          />
        </div>
      )}
    </div>
  );
};

export default BitePage;

import React from 'react';

const BiteComponent = ({ emotion, setEmotion, recipientId, setRecipientId, users, handleSendEmotion, error }) => {
  return (
    <div className="bite-component">
      <form onSubmit={(e) => { e.preventDefault(); handleSendEmotion(); }}>
        <div className="form-group">
          <label>Выберите эмоцию:</label>
          <select value={emotion} onChange={(e) => setEmotion(e.target.value)} required>
            <option value="">Выберите эмоцию</option>
            <option value="happy">Счастлив</option>
            <option value="sad">Грустный</option>
            <option value="angry">Злой</option>
            {/* Добавьте другие эмоции, если необходимо */}
          </select>
        </div>
        <div className="form-group">
          <label>Выберите получателя:</label>
          <select value={recipientId} onChange={(e) => setRecipientId(e.target.value)} required>
            <option value="">Выберите получателя</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.nickname || `Пользователь ${user.id}`}</option>
            ))}
          </select>
        </div>
        <button type="submit">Отправить эмоцию</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default BiteComponent;

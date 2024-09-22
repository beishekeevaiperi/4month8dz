import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from '../components/Modal'; // Импортируем модальное окно как компонент

function UserManagement() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Получение списка пользователей
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  // Создание нового пользователя
  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/users', data);
      fetchUsers(); // обновляем список пользователей
      setModalMessage('Пользователь успешно создан');
      setModalIsOpen(true);
      reset(); // сброс формы
    } catch (error) {
      console.error('Ошибка при создании пользователя', error);
    }
  };

  // Удаление пользователя
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers(); // обновляем список пользователей
      setModalMessage('Пользователь удален');
      setModalIsOpen(true);
    } catch (error) {
      console.error('Ошибка при удалении пользователя', error);
    }
  };

  return (
    <div>
      <h1>Управление пользователями</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Имя</label>
          <input {...register('name', { required: 'Поле имя обязательно' })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        
        <div>
          <label>Email</label>
          <input {...register('email', { 
            required: 'Поле email обязательно',
            pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' }
          })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        
        <div>
          <label>Username</label>
          <input {...register('username', { required: 'Поле username обязательно' })} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        
        <button type="submit">Создать пользователя</button>
      </form>

      <h2>Список пользователей</h2>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Username</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Список пуст</p>
      )}

      {/* Модальное окно */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}

export default UserManagement;

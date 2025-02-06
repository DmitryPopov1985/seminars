import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeminars, deleteSeminar, updateSeminar } from '../../slices/seminarsSlice';
import EditSeminarModal from '../EditSeminarModal/EditSeminarModal';
import SeminarItem from '../SeminarItem/SeminarItem';
import Loading from '../Loading/Loading';
import styles from './Seminars.module.css';

// Компонент Seminars отвечает за отображение списка семинаров и управление ими
const Seminars = () => {
    // Получаем dispatch для отправки действий в Redux
    const dispatch = useDispatch();
    
    // Извлекаем семинары, состояние загрузки и ошибки из глобального состояния
    const { seminars, loading, error } = useSelector((state) => state.seminars);

    // Управляем состоянием модального окна и текущего семинара для редактирования
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSeminar, setCurrentSeminar] = useState(null);

    // Загружаем семинары при первом рендеринге компонента
    useEffect(() => {
        dispatch(fetchSeminars());
    }, [dispatch]);

    // Обработчик открытия модального окна для редактирования семинара
    const handleEdit = (seminar) => {
        setCurrentSeminar(seminar); // Устанавливаем текущий семинар для редактирования
        setIsModalOpen(true); // Открываем модальное окно
    };

    // Обработчик закрытия модального окна
    const handleModalClose = () => {
        setIsModalOpen(false); // Закрываем модальное окно
        setCurrentSeminar(null); // Сбрасываем текущее состояние семинара
    };

    // Обработчик обновления семинара
    const handleUpdate = (values) => {
        // Отправляем обновленные значения семинара в Redux
        dispatch(updateSeminar({ ...currentSeminar, ...values }));
        handleModalClose(); // Закрываем модальное окно после обновления
    };

    // Обработчик удаления семинара
    const handleDelete = (id) => {
        // Подтверждение удаления семинара
        if (window.confirm('Вы уверены, что хотите удалить этот семинар?')) {
            dispatch(deleteSeminar(id)); // Отправляем действие на удаление семинара
        }
    };

    // Отображаем индикатор загрузки, если семинары еще загружаются
    if (loading) {
        return <Loading />;
    }

    // Отображаем сообщение об ошибке, если есть ошибка
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Отображаем список семинаров
    return (
        <div className={styles.seminarsContainer}>
            <h2 className={styles.seminarsTitle}>Семинары</h2>
            
            <ul>
                {seminars.map((seminar) => (
                    // На основе данных о каждом семинаре создаем элемент списка
                    <SeminarItem 
                        key={seminar.id} 
                        seminar={seminar} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            {currentSeminar && (
                // Отображаем модальное окно для редактирования семинара, если он выбран
                <EditSeminarModal
                    isOpen={isModalOpen}
                    onRequestClose={handleModalClose} // Передаем обработчик закрытия
                    initialValues={{
                        title: currentSeminar.title,
                        description: currentSeminar.description,
                        date: currentSeminar.date,
                        time: currentSeminar.time,
                        photo: currentSeminar.photo,
                    }}
                    onSubmit={handleUpdate} // Передаем обработчик обновления
                />
            )}
        </div>
    );
};

export default Seminars;
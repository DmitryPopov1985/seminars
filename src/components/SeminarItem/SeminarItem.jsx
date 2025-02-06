import React from 'react';
import styles from './SeminarItem.module.css';

const SeminarItem = ({ seminar, onEdit, onDelete }) => {
    return (
        <li className={styles.seminarItem}>
            <h3 className={styles.seminarTitle}>{seminar.title}</h3>
            <p className={styles.seminarDescription}>{seminar.description}</p>
            <p className={styles.seminarDateTime}>{seminar.date} {seminar.time}</p>
            {seminar.photo && <img className={styles.seminarImage} src={seminar.photo} alt={seminar.title} />}
            <div className={styles.buttonContainer}>
                <button onClick={() => onEdit(seminar)}>Редактировать</button>
                <button onClick={() => onDelete(seminar.id)}>Удалить</button>
            </div>
        </li>
    );
};

export default SeminarItem;
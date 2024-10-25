import React from 'react';
import styles from './CourseCard.module.css';

const CourseCard = ({ course }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{course.course_name}</h3>
      <p className={styles.description}>{course.description}</p>
    </div>
  );
};

export default CourseCard;

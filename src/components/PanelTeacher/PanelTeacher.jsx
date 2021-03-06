import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListarTeachers from '../../uiComponents/ListarTeachers/ListarTeachers';
import ListarCortes from '../../uiComponents/ListarCortes/ListarCortes';
import { getRole } from '../../reducers/authReducer';
import NavbarTeacher from '../Structure/NavbarTeacher';

const PanelTeacher = () => {
  const role = useSelector(getRole);
  return (
    <>
      <NavbarTeacher />
      <p>
        Role :
        {role}
      </p>
      <h1>Colegas</h1>
      <ListarTeachers />
      <h1>Cortes</h1>
      <ListarCortes />
    </>
  );
};

export default PanelTeacher;

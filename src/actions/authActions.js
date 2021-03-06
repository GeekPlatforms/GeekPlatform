/* eslint-disable import/prefer-default-export */
// aqui van todo lo relacionado a autenticacion
import { types } from '../types';
import { firebase, googleAuthProvider, db, functions } from '../firebase/firebaseConfig';

export const login = (uid, displayName, role) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      role,
    },
  };
};
export const logout = () => {
  return { type: types.logout };
};

export const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        console.log(err);
      });
  };

};

export const loginGoogle = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      }).catch((err) => { console.log('error', err); });
  };
};
export const loginFacebook = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(facebookAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      }).catch((err) => { console.log('error', err); });
  };
};

export const singOutAuth = () => async (dispatch) => {
  await firebase.auth().signOut();
  dispatch(logout());
};

export const registerWithEmailPasswordTeacher = (username, email, name, password) => async (dispatch) => {
  const userCredentials = {
    username,
    email,
    name,
    password,
    imageUrl: '',
    bio: 'escriba su presentacion',
    website: '',
    location: '',
    whatsapp: '',
    skills: [],
    github: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    personalizedTutorials: [],
    sprintsToScore: [],
    codelingoChallegencesToScore: [],
    academicResourcesToScore: [],
    role: 'teacher',
    active: false,
  };
  db.doc(`/teachers/${username}`).get().then((doc) => {
    if (doc.exists) {
      alert(`este usuario ${username} ya existe, intentente de con otro `);
    } else {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    }
  })
    .then((result) => {
      result.user.updateProfile({ displayName: name });
    })
    .then(() => {
      db.doc(`/teachers/${username}`).set(userCredentials);
    })
    .then(() => {
      alert('te has registrado con exito');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('este correo ya esta registrado');
      }
      console.log('error con correo registro', error.message);
    });
};

export const registerNewAdmin = (email, password, fullName) => async (dispatch) => {
  const addAdminRole = functions.httpsCallable('addAdminRole');
  let newAdmin;
  addAdminRole({ email, password, fullName })
    .then((doc) => {
      const user = doc.data;
      newAdmin = {
        uid: user.uid,
        email,
        fullName,
        password,
        photoURL: '',
        bio: '',
        whatsapp: '',
        linkedin: '',
      };
      return db.collection('admin').doc(user.uid).set(newAdmin);
    }).then(() => {
      dispatch({ type: 'updateListarAdmin', payload: newAdmin });
    })
    .catch((err) => {
      alert('algo salio mal');
      console.log(err);
    });
};
export const registerNewTeacher = (email, password, fullName) => async (dispatch, getState) => {
  const estadoProfesores = getState().teachers.teachers;

  const addTeacherRole = functions.httpsCallable('addTeacherRole');
  addTeacherRole({ email, password, fullName })
    .then((doc) => {
      const user = doc.data;
      const nuevoProfesor = { email, password, fullName, uid: user.uid };
      const data = [...estadoProfesores, nuevoProfesor];
      dispatch({ type: 'listarTeachers', payload: data });
      db.collection('teachers').doc(user.uid).set({
        uid: user.uid,
        email,
        fullName,
        password,
        photoURL: '',
        bio: 'escribe tu presentacion',
        website: '',
        location: '',
        whatsapp: '',
        skills: [],
        github: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        personalizedTutorials: [],
        sprintsToScore: [], //
        codelingoChallegencesToScore: [],
        academicResourcesToScore: [],
        active: true,
      }).then(() => console.log('exito'));
    }).catch((err) => console.log(err));

};

export const registerNewStudent = (email, password, fullName, corteId) => async (dispatch) => {
  const addStudentCorte = functions.httpsCallable('addStudentCorte');
  addStudentCorte({ corteId, email, password, fullName })
    .then((doc) => {
      const user = doc.data;
      const data = {
        uid: user.uid,
        email,
        fullName,
        password,
        corteId,
        photoURL: '',
        bio: '',
        website: '',
        location: '',
        whatsapp: '',
        skills: [],
        github: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        geekyPuntos: '',
        sprintsAssigned: [],
        graduated: false,
        tutorialsRequired: [],
        codelingoChallengesDone: [],
        wakatime: [],
        active: true,
      };
      db.collection('cortes').doc(corteId)
        .collection('students').doc(user.uid)
        .set(data)
        .then(() => {
          alert(`estudiante ${data.fullName} ha sido creado`);
          dispatch({ type: 'addNewStudent', payload: data });
        });
    }).catch((err) => alert(err));
};

let url = 'http://localhost:4000/api';

if (process.env.NODE_ENV === 'production') {
  url = 'https://calm-lake-41655.herokuapp.com/api';
}

export default url;

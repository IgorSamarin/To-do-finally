import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;

export const GetTasks = async (filters, userId) => {
  try {
    let queryString = {
      chronology: filters.chronology,
    };
    if (filters.complete !== 'all') queryString.complete = filters.complete;

    const result = await axios.get(
      `${apiUrl}/user/${userId}/tasks?` + new URLSearchParams(queryString),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const PostTask = async (text, userId) => {
  try {
    const result = await axios.post(`${apiUrl}/user/${userId}/tasks`, { text });
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const DeleteTask = async (id, userId) => {
  try {
    const result = await axios.delete(`${apiUrl}/user/${userId}/task/${id}`);
    return result;
  } catch (e) {
    console.log(e.message);
  }
};

export const DoneTask = async (id, classes, userId) => {
  try {
    const result = await axios.put(`${apiUrl}/user/${userId}/task/${id}`, {
      complete: !classes,
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const EditTask = async (id, text, userId) => {
  try {
    const result = await axios.put(`${apiUrl}/user/${userId}/task/${id}`, {
      text: text,
    });
    return result;
  } catch (e) {
    console.log(e.message);
  }
};


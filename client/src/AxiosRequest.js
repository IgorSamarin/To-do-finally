import axios from 'axios';

const apiUrl = 'http://localhost:7000/api';

export const GetTasks = async () => {
  try {
    const result = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const PostTask = async (text) => {
  try {
    const result = await axios.post(apiUrl, { text });
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const DeleteTask = async (id) => {
  try {
    const result = await axios.delete(`http://localhost:7000/api/${id}`);
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const DoneTask = async (id, classes) => {
  try {
    const result = await axios.put(`http://localhost:7000/api/${id}`, {
      complete: classes,
    });
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};
export const EditTask = async (id, text) => {
  try {
    const result = await axios.put(`http://localhost:7000/api/${id}`, {
      text: text,
    });
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};


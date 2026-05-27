// services/api.js

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// 1️⃣ Fetch all students
export function getStudents() {
  return fetch(BASE_URL).then(res => res.json());
}

// 2️⃣ Fetch one student by ID
export function getStudentById(id) {
  return fetch(`${BASE_URL}/${id}`).then(res => res.json());
}

// 3️⃣ Update a student (PUT)
export function updateStudent(id, data) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify(data)
  }).then(res => res.json());
}

// 4️⃣ Add new student (POST)
export function addStudent(data) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

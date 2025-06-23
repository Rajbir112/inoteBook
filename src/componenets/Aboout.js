import React from 'react';

export default function About() {
  return (
    <div className="container my-5">
      <div className="bg-light p-4 rounded shadow">
        <h2 className="text-primary mb-3">About iNotebook</h2>
        <p className="text-dark">
          <strong>iNotebook</strong> is a secure and user-friendly cloud-based note-taking
          application developed using the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, and Node.js).
          It allows users to seamlessly create, update, delete, and manage their personal notes
          from any device, at any time.
        </p>
        <p className="text-dark">
          The app includes robust authentication mechanisms using <strong>JSON Web Tokens (JWT)</strong>,
          ensuring that each user's notes remain private and protected. iNotebook aims to offer a
          reliable and efficient solution for digital note organization, productivity, and
          information management.
        </p>
      </div>
    </div>
  );
}
 
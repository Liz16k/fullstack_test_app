import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';

const News = () => {
  const [news, setNews] = useState([]);
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const getNews = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/news', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        logout();
        navigate('/login');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch ${error.message}`);
    }
  }, [logout, navigate, token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    getNews().then((data) => {
      setNews(data);
    }).catch((err) => {
      console.log(err.message);
      navigate('/login');
    });
  }, [getNews, token, navigate, logout]);

  return (
    <>
      <h2>News</h2>
      <ul>
        {Array.isArray(news) && news.map((n) => <li>{n.title}</li>)}
      </ul>
    </>
  );
};

export default News;

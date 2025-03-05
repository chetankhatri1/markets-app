import React from 'react';
import { Link } from 'react-router-dom';
import './RecentNews.css';

const RecentNews = ({ news }) => {
  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time elapsed since publication
  const getTimeElapsed = (dateString) => {
    const published = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - published) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    return formatDate(dateString);
  };

  return (
    <div className="recent-news">
      {news.length === 0 ? (
        <div className="no-news">
          <p>No recent news available</p>
        </div>
      ) : (
        <div className="news-list">
          {news.map((item) => (
            <div key={item._id} className="news-item">
              <div className="news-meta">
                <span className="news-source">{item.source}</span>
                <span className="news-time">{getTimeElapsed(item.publishedAt)}</span>
              </div>
              
              <h3 className="news-title">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
              
              <p className="news-summary">{item.summary}</p>
              
              {item.relatedSymbols && item.relatedSymbols.length > 0 && (
                <div className="related-symbols">
                  {item.relatedSymbols.map((symbol, index) => (
                    <Link 
                      key={index}
                      to={`/stocks/${symbol}`}
                      className="related-symbol"
                    >
                      ${symbol}
                    </Link>
                  ))}
                </div>
              )}
              
              <div className="news-footer">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read more
                  <i className="fas fa-external-link-alt ml-1"></i>
                </a>
                
                {item.sentiment && (
                  <div className={`news-sentiment ${item.sentiment.toLowerCase()}`}>
                    <i className={`fas fa-${
                      item.sentiment === 'Positive' ? 'arrow-up' : 
                      item.sentiment === 'Negative' ? 'arrow-down' : 'minus'
                    }`}></i>
                    {item.sentiment}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentNews;

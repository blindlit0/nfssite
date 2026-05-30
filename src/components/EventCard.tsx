import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, date, imageUrl, onEdit, onDelete }) => {
  const [year, month, day] = date.split('-');
  const monthName = new Date(date).toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <StyledWrapper>
      <div className="parent">
        <div className="card">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={150}
              className="card-image"
            />
          )}
          <div className="content-box">
            <span className="card-title">{title}</span>
            <p className="card-content">{description}</p>
            {onEdit && <button onClick={onEdit} className="see-more">Edit</button>}
            {onDelete && <button onClick={onDelete} className="see-more delete-button">Delete</button>}
          </div>
          <div className="date-box">
            <span className="month">{monthName}</span>
            <span className="date">{day}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .parent {
    width: 300px;
    padding: 20px;
    perspective: 1000px;
  }

  .card {
    padding-top: 50px;
    border: 3px solid #141414;
    transform-style: preserve-3d;
    background: linear-gradient(135deg, #0000 18.75%, #f3f3f3 0 31.25%, #0000 0),
      repeating-linear-gradient(45deg, #f3f3f3 -6.25% 6.25%, #141414 0 18.75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 0;
    background-color: #141414;
    width: 100%;
    box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
    transition: all 0.5s ease-in-out;
    position: relative;
  }

  .card:hover {
    background-position: -100px 100px, -100px 100px;
    transform: rotate3d(0.5, 1, 0, 30deg);
  }
  
  .card-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  .content-box {
    background: #8ed500;
    transition: all 0.5s ease-in-out;
    padding: 60px 25px 25px 25px;
    transform-style: preserve-3d;
  }

  .content-box .card-title {
    display: inline-block;
    color: #141414;
    font-size: 25px;
    font-weight: 900;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 50px);
  }

  .content-box .card-title:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .card-content {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #141414;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 30px);
  }

  .content-box .card-content:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .see-more {
    cursor: pointer;
    margin-top: 1rem;
    display: inline-block;
    font-weight: 900;
    font-size: 9px;
    text-transform: uppercase;
    color: #8ed500;
    background: #141414;
    padding: 0.5rem 0.7rem;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 20px);
    border: none;
  }

  .content-box .see-more:hover {
    transform: translate3d(0px, 0px, 60px);
  }
  
  .delete-button {
    margin-left: 10px;
    background-color: #ff4d4d;
    color: white;
  }

  .date-box {
    position: absolute;
    top: 30px;
    right: 30px;
    height: 60px;
    width: 60px;
    background: #141414;
    border: 1px solid #8ed500;
    padding: 10px;
    transform: translate3d(0px, 0px, 80px);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
  }

  .date-box span {
    display: block;
    text-align: center;
  }

  .date-box .month {
    color: #8ed500;
    font-size: 9px;
    font-weight: 700;
  }

  .date-box .date {
    font-size: 20px;
    font-weight: 900;
    color: #8ed500;
  }
`;

export default EventCard;

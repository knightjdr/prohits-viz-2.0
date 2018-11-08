import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'antd';
import { NavLink } from 'react-router-dom';

const NewsListItem = ({
  item,
}) => {
  const desc = (
    <div>
      <div>
        { item.date }
      </div>
      <div className="news__list-details">
        { item.details }
      </div>
    </div>
  );
  return (
    <List.Item
      actions={[<NavLink to={`/news/${encodeURI(item.headline)}`}>more</NavLink>]}
    >
      <List.Item.Meta
        title={item.headline}
        description={desc}
      />
    </List.Item>
  );
};

NewsListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    details: PropTypes.string,
    headline: PropTypes.string,
  }).isRequired,
};

export default NewsListItem;

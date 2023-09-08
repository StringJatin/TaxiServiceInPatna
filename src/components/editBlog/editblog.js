import React from 'react';
import Link from 'next/link';

const EditBlog = ({ customUrl }) => {
  return (
    <Link href={`/api/get${customUrl}`}>
      <a className="button-40" role="button">
        Edit Post
      </a>
    </Link>
  );
};

export default EditBlog;

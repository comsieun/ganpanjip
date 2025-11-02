import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Work } from '../../models/Work';
import styles from './WorkCard.module.css';

interface Props {
  work: Work;
}

const isVideo = (url: string) => {
  return /\.(mp4|webm|mov)$/i.test(url);
};

const WorkCard: React.FC<Props> = ({ work }) => {
  return (
    <Link href={`/work/${work.id}`} className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        {isVideo(work.thumbnail) ? (
          <video
            src={work.thumbnail}
            className={styles.thumbnail}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={work.thumbnail}
            alt={`${work.title} thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{work.title}</p>
        <p className={styles.owner}>{work.owner}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
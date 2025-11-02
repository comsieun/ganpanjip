// pages/index.tsx
import { GetServerSideProps, NextPage } from 'next';
import { getWorks } from '../api/worksApi';
import { Work, WorkData } from '../models/Work';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WorkCard from '../components/works/WorkCard';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'; 

interface Props {
  works: WorkData[];
}

const HomePage: NextPage<Props> = ({ works: worksData }) => {
  const router = useRouter(); // router 훅 사용
  const { type } = router.query; // 쿼리 파라미터 (type) 가져오기
  
  // WorkData를 Work 클래스 인스턴스로 변환
  const allWorks = worksData.map(data => new Work(data));

  // 표시할 작품 필터링
  const filteredWorks = allWorks.filter(work => {
    if (type !== 'work' && type !== 'original') {
      return true; // 모든 작품 표시
    }
    return work.workType === type; 
  });

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          {filteredWorks.length > 0 ? (
            filteredWorks.map(work => <WorkCard key={work.id} work={work} />)
          ) : (
            <p>표시할 작품이 없습니다.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const works = await getWorks(); 
    const worksData = JSON.parse(JSON.stringify(works)); //JSON 변환

    return {
      props: {
        works: worksData, // 모든 작품 데이터
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        works: [],
      },
    };
  }
};

export default HomePage;
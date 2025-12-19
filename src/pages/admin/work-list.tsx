import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Admin.module.css'; 
import { WorkData } from '../../models/Work';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface WorkItem extends Omit<WorkData, 'id'> {
  _id?: string; 
  id?: string;  
}

export default function WorkListPage() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await fetch(`${API_URL}/works`);
      if (response.ok) {
        const data = await response.json();
        // 최신순 정렬
        const sortedData = data.sort((a: WorkItem, b: WorkItem) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setWorks(sortedData);
      } else {
        console.error('Failed to fetch works');
      }
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`${API_URL}/works/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        setWorks(prev => prev.filter(work => (work.id || work._id) !== id));
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('오류가 발생했습니다.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/work-form?id=${id}`);
  };

  if (isLoading) return <div className={styles.loadingText}>Loading...</div>;

  return (
    <div className={styles.listContainer}>
      <header className={styles.listHeader}>
        <h1 className={styles.pageTitle}>Work Management</h1>
        <Link href="/admin/work-form">
          <button className={`${styles.button} ${styles.createButton}`}>+ New Work</button>
        </Link>
      </header>

      <div className={styles.simpleListWrapper}>
        <table className={styles.simpleTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th style={{ width: '140px', textAlign: 'center' }}>Manage</th>
            </tr>
          </thead>
          <tbody>
            {works.length === 0 ? (
              <tr>
                <td colSpan={2} className={styles.emptyRow}>
                  등록된 게시물이 없습니다.
                </td>
              </tr>
            ) : (
              works.map((work) => {
                const workId = work.id || work._id || '';
                return (
                  <tr key={workId}>
                    <td className={styles.tdTitleSimple}>
                      {work.title}
                    </td>
                    <td className={styles.tdActions}>
                      <button 
                        onClick={() => handleEdit(workId)} 
                        className={`${styles.miniButton} ${styles.editBtn}`}
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => handleDelete(workId)} 
                        className={`${styles.miniButton} ${styles.deleteBtn}`}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
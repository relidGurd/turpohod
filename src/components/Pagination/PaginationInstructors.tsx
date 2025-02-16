"use client";
import { Pagination } from "antd";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const PaginationInstructors: React.FC<any> = ({ instructors_pages }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const params = useParams(); // Получаем параметры из URL

  const pageFromUrl = Number(params.id) || 1; // Преобразуем в число, если undefined — ставим 1
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, []);

  const handleChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      router.push(`/instructors`);
    } else {
      router.push(`/instructors/${page}`);
    }
  };

  return (
    <Pagination
      style={{ marginTop: "2rem" }}
      align="center"
      current={currentPage}
      total={instructors_pages * 10}
      onChange={handleChange}
    />
  );
};

export default PaginationInstructors;

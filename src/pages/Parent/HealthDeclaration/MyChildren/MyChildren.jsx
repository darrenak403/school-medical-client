import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import axiosInstance from "../../../../api/axios";
import {useNavigate} from "react-router-dom";
import {setListStudentParentPersist} from "../../../../redux/feature/listStudentPersist";
import {
  User,
  Calendar,
  GraduationCap,
  Shield,
  Eye,
  CheckCircle,
} from "lucide-react";
import {format, parseISO} from "date-fns";
import useSWR from "swr";

// Hàm fetcher dùng cho useSWR, nhận url và trả về dữ liệu từ API
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const MyChildren = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parentId = useSelector((state) => state.user?.userId);

  // 1. Lấy danh sách học sinh bằng useSWR
  // Nếu có parentId thì gọi API, nếu chưa có thì không gọi
  const {data: students = []} = useSWR(
    parentId ? `/api/parents/${parentId}/students` : null,
    fetcher
  );

  // 2. Khi có dữ liệu học sinh, lưu vào localStorage và redux (giống useEffect cũ)
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
      dispatch(setListStudentParentPersist(students));
    }
  }, [students, dispatch]);

  // 3. Lấy trạng thái khai báo sức khỏe cho từng học sinh bằng useSWR
  // Nếu có học sinh thì gọi API cho từng studentId, trả về một map
  const {data: declarationMap = {}} = useSWR(
    //
    students.length > 0
      ? ["health-declarations", students.map((s) => s.studentId)]
      : null,
    //
    async () => {
      const map = {};
      await Promise.all(
        students.map(async (item) => {
          try {
            const res = await axiosInstance.get(
              `/api/students/${item.studentId}/health-declarations`
            );
            map[item.studentId] =
              res.data.healthDeclaration?.isDeclaration || false;
          } catch {
            map[item.studentId] = false;
          }
        })
      );
      return map;
    }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div
        className="w-[90%] h-[900px] rounded-2xl shadow-xl bg-white overflow-hidden"
        style={{
          boxShadow: "0 8px 32px 0 rgba(53,83,131,0.10)",
        }}
      >
        {/* Header gradient */}
        <div
          style={{
            width: "100%",
            background: "linear-gradient(180deg, #2B5DC4 0%, #355383 100%)",
            padding: "36px 0 18px 0",
            marginBottom: "40px",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "120px",
              height: "120px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "80px",
              height: "80px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "25%",
              width: "60px",
              height: "60px",
              background: "rgba(255, 193, 7, 0.2)",
              borderRadius: "50%",
            }}
          />

          <h1
            style={{
              fontWeight: 700,
              fontSize: 38,
              color: "#fff",
              letterSpacing: 1,
              marginBottom: 8,
              marginTop: 0,
            }}
          >
            Health Profile
          </h1>
          <div
            style={{
              color: "#e0e7ff",
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Manage your children's health profiles
          </div>
        </div>

        {/* Content */}
        <div
          className="px-10 py-8"
          style={{
            maxHeight: "650px",
            overflowY: "auto",
          }}
        >
          {students.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Children Found
              </h3>
              <p className="text-gray-500">
                Your children information will appear here.
              </p>
            </div>
          ) : (
            <div
              className="animate__animated animate__fadeIn"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {students.map((item) => (
                <div
                  key={item.studentId}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  style={{
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    border: "1px solid #f0f0f0",
                    margin: "0 30px",
                    padding: "20px 24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div className="flex items-center justify-between">
                    {/* Student Info Section - Left Side */}
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #3058A4 0%, #2563eb 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 24,
                          color: "#fff",
                          marginRight: 16,
                          boxShadow: "0 2px 8px rgba(43, 93, 196, 0.2)",
                        }}
                      >
                        {item.fullName[0]}
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 4,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: 20,
                              color: "#374151",
                              marginRight: 8,
                            }}
                          >
                            {item.fullName}
                          </span>

                          {/* Status badge moved inline with name */}
                          {declarationMap[item.studentId] ? (
                            <span
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium gap-1"
                              style={{
                                backgroundColor: "#e6fff2",
                                color: "#10b981",
                              }}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Declared
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: "#fff7ed",
                                color: "#f97316",
                                gap: "0.25rem",
                              }}
                            >
                              <Shield className="w-3 h-3 mr-1" /> Not Declared
                            </span>
                          )}
                        </div>
                        <div className="rounded-md">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500 font-medium mr-2">
                              Date of Birth:
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {item.dayOfBirth
                                ? format(
                                    parseISO(item.dayOfBirth),
                                    "dd/MM/yyyy"
                                  )
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Class - Middle Section */}
                    <div
                      className="flex justify-center gap-5 md:gap-10 lg:gap-40"
                      style={{width: "45%", paddingLeft: 20}}
                    >
                      {/* Student ID (moved from name section) */}
                      <div className="bg-blue-50 px-4 py-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-600 mr-2" />
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] text-gray-500 uppercase font-medium mr-2">
                              STUDENT ID:
                            </span>
                            <span className="text-[16px] font-medium text-gray-800">
                              {item.studentCode}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Class - Remains the same */}
                      <div className="bg-purple-50 px-4 py-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-600 mr-2" />
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] text-gray-500 uppercase font-medium mr-2">
                              CLASS:
                            </span>
                            <span className="text-[16px] font-medium text-gray-800">
                              {item.grade.trim()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions - Right Section */}
                    <div
                      className="flex items-center justify-end gap-2"
                      style={{width: "30%"}}
                    >
                      {!declarationMap[item.studentId] ? (
                        // Nếu CHƯA khai báo, chỉ hiện nút Declare
                        <button
                          className="flex items-center justify-center gap-1.5 transition-all duration-200"
                          style={{
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            height: 36,
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#374151",
                            padding: "0 14px",
                          }}
                          onClick={() => {
                            localStorage.setItem(
                              "selectedStudent",
                              JSON.stringify({
                                studentId: item.studentId,
                                fullName: item.fullName,
                              })
                            );
                            navigate(
                              `/parent/health-declaration/declaration-form`,
                              {
                                state: {
                                  studentId: item.studentId,
                                  fullName: item.fullName,
                                },
                              }
                            );
                          }}
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Declare
                        </button>
                      ) : (
                        // Nếu ĐÃ khai báo, hiện 3 nút còn lại
                        <>
                          <button
                            className="flex items-center justify-center gap-1.5 transition-all duration-200 hover:bg-gray-50"
                            style={{
                              background: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: 8,
                              height: 36,
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#374151",
                              padding: "0 14px",
                            }}
                            onClick={() => {
                              localStorage.setItem(
                                "selectedStudent",
                                JSON.stringify({
                                  studentId: item.studentId,
                                  fullName: item.fullName,
                                })
                              );
                              navigate(`/parent/health-declaration/detail`);
                            }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Details
                          </button>

                          <button
                            className="flex items-center justify-center gap-1.5 transition-all duration-200 hover:bg-gray-50"
                            style={{
                              background: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: 8,
                              height: 36,
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#374151",
                              padding: "0 14px",
                            }}
                            onClick={() => {
                              localStorage.setItem(
                                "selectedStudent",
                                JSON.stringify({
                                  studentId: item.studentId,
                                  fullName: item.fullName,
                                })
                              );
                              navigate(`/parent/vaccine/result`);
                            }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Vaccine
                          </button>

                          <button
                            className="flex items-center justify-center gap-1.5 transition-all duration-200 hover:bg-gray-50"
                            style={{
                              background: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: 8,
                              height: 36,
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#374151",
                              padding: "0 14px",
                            }}
                            onClick={() => {
                              localStorage.setItem(
                                "selectedStudent",
                                JSON.stringify({
                                  studentId: item.studentId,
                                  fullName: item.fullName,
                                })
                              );
                              navigate(`/parent/healthcheck/result`);
                            }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Health check
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChildren;

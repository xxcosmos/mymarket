//const baseURL = 'http://127.0.0.1:8080/';
const baseURL = 'https://xiaoyuu.ngrok.xiaomiqiu.cn/';
module.exports = {
    user: baseURL + 'user',
    good: baseURL + 'good',
  queryStudentId: baseURL + 'student/info/name',
  queryStudentName: baseURL + 'student/info/id',
  queryStudentPic: baseURL+'student/pic/query'
};
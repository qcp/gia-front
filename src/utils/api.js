// const mocks = {
//   "auth": { POST: { status: "OK", token: "This-is-a-mocked-token" } },
//   "exit": { POST: { status: "OK" } },
//   "get-user": {
//     POST: {
//       status: "OK", user: {
//         id: "4",
//         firstName: "имя",
//         lastName: "фамилия",
//         age: "12",
//         isActive: true,
//         role: "user",
//         email: "ssss@ssss.ss",
//         office: "офис",
//         isLastLogoutError: true
//       }
//     }
//   },
//   "create-user": {
//     POST: {
//       status: "OK", user: {
//         id: "4",
//         firstName: "имя",
//         lastName: "фамилия",
//         age: "12",
//         isActive: true,
//         role: "user",
//         email: "ssss@ssss.ss",
//         office: "офис"
//       }
//     }
//   },
//   "update-user": {
//     POST: {
//       status: "OK", user: {
//         id: "4",
//         firstName: "имя",
//         lastName: "фамилия",
//         age: "12",
//         isActive: true,
//         role: "user",
//         email: "ssss@ssss.ss",
//         office: "офис"
//       }
//     }
//   },
//   "get-user-tracking": {
//     POST: {
//       status: "OK", tracking: [
//         {
//           isCrash: true,
//           loginTime: new Date(Date.parse("2012-01-26T13:51:50.417Z")),
//           logoutTime: new Date(Date.parse("2012-01-26T14:21:50.417Z")),
//           reasonText: "fsdssd"
//         },
//         {
//           isCrash: false,
//           loginTime: new Date(Date.parse("2012-01-26T13:51:50.417Z")),
//           logoutTime: new Date(Date.parse("2012-01-27T14:51:20.417Z")),
//           reasonText: "false"
//         }
//       ]
//     }
//   },
//   "get-user-list": {
//     POST: {
//       status: "OK", users: [
//         {
//           id: "1",
//           firstName: "имя",
//           lastName: "фамилия",
//           age: "12",
//           isActive: true,
//           role: "user",
//           email: "ssss@ssss.ss",
//           office: "офис"
//         },
//         {
//           id: "2",
//           firstName: "имя1",
//           lastName: "фамилия",
//           age: "12",
//           isActive: true,
//           role: "user",
//           email: "ssss@ssss.ss",
//           office: "офис"
//         },
//         {
//           id: "3",
//           firstName: "имя2",
//           lastName: "фамилия",
//           age: "12",
//           isActive: true,
//           role: "user",
//           email: "ssss@ssss.ss",
//           office: "офис"
//         }
//       ]
//     }
//   },
//   "save-no-logout-reason": { POST: { status: "OK" } },
//   "get-roles" : {},
//   "get-offices": {}
// };

const apiCall = ({ url, method, data }) =>
  fetch(`https://gia-mpu.herokuapp.com/${url}`, {
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ 
      token: localStorage.getItem("user-token"),
      data: data
    })
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.status == "OK")
      return Promise.resolve(res);
    else
      return Promise.reject();
  });
export default apiCall;

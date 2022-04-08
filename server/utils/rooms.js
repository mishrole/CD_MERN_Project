let users = [];

const userJoin = (socketId, id, name, room) => {
  const user = { id, socketId, name, room };
  const isUserInRoom = users.find((user) => user.id === id && user.room === room);

  if (!isUserInRoom) {
    users.push(user);
  } else {
    updateSocketId(user.id, user.room, user.socketId);
  }

  return user;
}

const getCurrentUser = (id, room) => {
  return users.find((user) => user.id === id && user.room === room);
}

const updateSocketId = (id, room, socketId) => {
  const user = getCurrentUser(id, room);

  if (user) {
    user.socketId = socketId;
  }

  return user;
}

const leaveFromAll = (id) => {
  const filteredUsers = users.filter((user) => user.id === id);
  users = filteredUsers;
  return filteredUsers;
}

const userLeave = (id, socketId) => {
  const filteredUsers = users.filter((user) => user.id !== id && user.socketId !== socketId);
  users = filteredUsers;
  return filteredUsers;
}

const userLogout = (id) => {
  const filteredUsers = users.filter((user) => user.id !== id);
  users = filteredUsers;
  return filteredUsers;
}

const getUsersConnectedToRoom = (room) => {
  return users.filter((user) => user.room === room);
}


const getUsers = () => {
  return users;
}

module.exports = { userJoin, userLeave, getUsersConnectedToRoom, getUsers, userLogout, leaveFromAll };
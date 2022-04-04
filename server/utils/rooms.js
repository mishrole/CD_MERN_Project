let users = [];

const userJoin = (socketId, id, name, room) => {
  const user = { id, socketId, name, room };
  users.push(user);
  return user;
}

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
}

const updateSocketId = (id, socketId) => {
  const user = getCurrentUser(id);
  user.socketId = socketId;
  return user;
}

const userLeave = (id, room) => {
  const filteredUsers = users.filter((user) => user.id !== id && user.room === room);
  users = filteredUsers;
  return filteredUsers;
}

const getUsersConnectedToRoom = (room) => {
  return users.filter((user) => user.room === room);
}

module.exports = { userJoin, getCurrentUser, updateSocketId, userLeave, getUsersConnectedToRoom };
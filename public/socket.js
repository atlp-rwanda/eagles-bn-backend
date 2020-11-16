/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
let socket = io();
const panel = document.querySelector('.panel');
const icon = document.getElementById('iconBell');
const iconII = document.getElementById('iconBel');
const iconIII = document.getElementById('iconBe');
const realReceiverId = document.getElementById('receiverId');

const realreceiver = () => {
  socket.emit('realReceipt', realReceiverId.value || 0);
};
const showNotification = () => {
  icon.style.display = 'none';
  iconII.style.display = 'block';
  panel.style.display = 'block';
  realreceiver();
};
icon.addEventListener('click', showNotification);

const icstyle = () => {
  icon.style.display = 'none';
  panel.style.display = 'none';
  iconII.style.display = 'none';
};

const hideNotification = () => {
  icstyle();
  iconIII.style.display = 'block';
  realreceiver();
};
iconII.addEventListener('click', hideNotification);

const showNotificationAgain = () => {
  icon.style.display = 'none';
  panel.style.display = 'block';
  iconII.style.display = 'block';
  iconIII.style.display = 'none';
  realreceiver();
};
iconIII.addEventListener('click', showNotificationAgain);

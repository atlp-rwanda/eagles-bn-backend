/* eslint-disable class-methods-use-this */
import app from '../sockets';
import emitter from '../EventEmitters';
import NotificationService from '../../services/notificationServices';
import TripServices from '../../services/tripServices';

class Notifier {
  async notify(
    description,
    receiver,
    requester,
    tripId,
    event = 'new-notification'
  ) {
    const { id } = await NotificationService.create({
      tripId,
      description,
      receiver_id: receiver,
      creator_id: requester,
    });
    const {
      notifications: [notification],
    } = await NotificationService.getNotifications({ id });
    app.io.emit(event, notification);
  }

  async init() {
    await this.handleCommentedOnTripRequest();
    await this.handleCreatedTripRequest();
    await this.handleUpdatedTripRequest();
  }

  async handleCreatedTripRequest() {
    await emitter.on('request created', async (request) => {
      const { id, manager_id, requester_id } = request;
      const notificationMessage = `requested a new trip`;
      this.notify(notificationMessage, manager_id, requester_id, id);
    });
  }

  async handleUpdatedTripRequest() {
    await emitter.on(
      'request updated',
      async ({ dataValues: request, _changed }) => {
        const {
          id,
          manager_id,
          requester_id,
          status
        } = request;
        const changes = Array.from(_changed);
        let notificationMessage = `updated "${changes.join('", "')}" on a trip`;
        let receiptient = manager_id;
        let sender = requester_id;
        if (changes[0] === 'status') {
          notificationMessage = `${status} your trip request`;
          receiptient = requester_id;
          sender = manager_id;
        }
        this.notify(notificationMessage, receiptient, sender, id);
      }
    );
  }

  async handleCommentedOnTripRequest() {
    await emitter.on('comment added', async (comment) => {
      const {
        id,
        comment: msg,
        tripId,
        userId
      } = comment;
      const [{ manager_id, requester_id }] = await TripServices.getTrips({
        id: tripId,
      });
      const receiptient = manager_id === userId ? requester_id : manager_id;
      const messagePart = msg.length > 24 ? `${msg.split('').slice(0, 24).join('')}...` : msg;
      const notificationMessage = `commented on a trip: ${messagePart}`;
      this.notify(notificationMessage, receiptient, userId, id);
    });
  }
}

const notifier = new Notifier();

export default () => {
  notifier.init();
};

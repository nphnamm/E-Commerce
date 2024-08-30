import axios from "axios";
import { server } from "../../server";

// create event
export const createevent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const { d } = await axios.post(`${server}/event/create-event`, data);
    dispatch({
      type: "eventCreateSuccess",
      payload: d.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};
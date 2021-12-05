import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const SessionTimer = () => {
  const [idleModal, setIdleModal] = useState(false);
  const idleTimeout = 1000 * 60 * 1;
  const idleLogout = 1000 * 60 * 2;
  let idleEvent;
  let logoutEvent;

  const events = ['click'];

  const sessionTimeout = () => {
    console.log('object');
    if (!!idleEvent) {
      clearTimeout(idleEvent);
    }
    if (!!logoutEvent) {
      clearTimeout(logoutEvent);
    }
    idleEvent = setTimeout(() => setIdleModal(true), idleTimeout);
    logoutEvent ==
      setTimeout(() => {
        logout();
      }, idleLogout);
  };
  const extendSession = (): void => {
    setIdleModal(false);
    sessionTimeout();
  };
  useEffect(() => {
    for (const e in events) {
      window.addEventListener(events[e], sessionTimeout);
    }
    return () => {
      for (const e in events) {
        window.removeEventListener(events[e], sessionTimeout);
      }
    };
  }, []);
  function logout(): void {
    location.href = '/logout.html';
  }
  return (
    <div>
      <Modal isOpen={idleModal} toggle={() => setIdleModal(false)}>
        <ModalHeader toggle={() => setIdleModal(false)}>
          Session Expire Warning
        </ModalHeader>
        <ModalBody>Your session expiring in 1 min</ModalBody>
        <ModalFooter>
          <button className="btn btn-info" onClick={() => logout()}>
            Logout
          </button>
          <button className="btn btn-info" onClick={() => extendSession()}>
            Continue
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SessionTimer;

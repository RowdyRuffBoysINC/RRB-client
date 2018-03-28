/* eslint-disable */
import React from "react";
import socketIOClient from "socket.io-client";
import adapter from "webrtc-adapter";
export class WebCam extends React.Component {
  componentDidMount() {
    this._init();
  }
  componentDidUpdate() {
    this._init();
  }

  _init() {
    
//#region Helpers
    /**
     * Helper functions to get this to work
     **/

    const trace = text => {
      text = text.trim();
      const now = (window.performance.now() / 1000).toFixed(3);
      console.log(now, text);
    };

    const getPeerName = peerConnection => {
      return peerConnection === localPeerConnection
        ? "localPeerConnection"
        : "remotePeerConnection";
    };

    const getOtherPeer = peerConnection => {
      return peerConnection === localPeerConnection
        ? remotePeerConnection
        : localPeerConnection;
    };

    const randomToken = () => {
      return Math.floor((1 + Math.random()) * 1e16)
        .toString(16)
        .substring(1);
    };

//#endregion

//#region WebCam
    let startTime = null;
    const localVideo = document.getElementById("webCam-localVideo");
    const remoteVideo = document.getElementById("webCam-remoteVideo");

    let localStream;
    let remoteStream;

    let localPeerConnection;
    let remotePeerConnection;

    localVideo.addEventListener("loadedmetadata", logVideoLoaded);
    remoteVideo.addEventListener("loadedmetadata", logVideoLoaded);
    remoteVideo.addEventListener("onresize", logResizedVideo);

    const mediaStreamConstraints = {
      video: true
    };

    const gotLocalMediaStream = mediaStream => {
      localVideo.srcObject = mediaStream;
    };

    const handleLocalMediaStreamError = error => {
      console.log("navigator.getUserMedia error: ", error);
    };

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);

    const offerOptions = {
      offerToReceiveVideo: 1
    };

    const gotLocalStreamMediaStream = mediaStream => {
      localVideo.srcObject = mediaStream;
      localStream = mediaStream;
      trace("Received local stream.");
      callButton.disabled = false;
    };

    const gotRemoteMediaStream = event => {
      const mediaStream = event.stream;
      remoteVideo.srcObject = mediaStream;
      remoteStream = mediaStream;
      trace("Remote peer connection received remote stream.");
    };

    function logVideoLoaded(event) {
      const video = event.target;
      trace(
        `${video.id} videoWidth: ${video.videoWidth}px, videoHeight: ${
          video.videoHeight
        }px`
      );
    }

    function logResizedVideo(event) {
      logVideoLoaded(event);
      if (startTime) {
        const elapsedTime = window.performance.now() - startTime;
        startTime = null;
        trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
      }
    }

    const handleConnection = event => {
      const peerConnection = event.target;
      const iceCandidate = event.candidate;

      if (iceCandidate) {
        const newIceCandidate = new RTCIceCandidate(iceCandidate);
        const otherPeer = getOtherPeer(peerConnection);

        otherPeer
          .addIceCandidate(newIceCandidate)
          .then(() => {
            handleConnectionSuccess(peerConnection);
          })
          .catch(error => {
            handleConnectionFailure(peerConnection.error);
          });

        trace(
          `${getPeerName(peerConnection)} ICE candidate:\n ${
            event.candidate.candidate
          }`
        );
      }
    };

    function handleConnectionSuccess(peerConnection) {
      trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
    }

    function handleConnectionFailure(peerConnection, error) {
      trace(
        `${getPeerName(
          peerConnection
        )} failed to add ICE Candidate:\n ${error.toString()}.`
      );
    }

    function handleConnectionChange(event) {
      const peerConnection = event.target;
      console.log("ICE state change event: ", event);
      trace(
        "${getPeerName(peerConnection)} ICE state: ${peerConnection.iceConnectionState}"
      );
    }

    function setSessionDescriptionError(error) {
      trace("Failed to create session description ${error.toString()}.");
    }

    function setDescriptionSuccess(peerConnection, functionName) {
      const peerName = getPeerName(peerConnection);
      trace(`${peerName} ${functionName} complete.`);
    }

    function setLocalDescriptionSuccess(peerConnection) {
      setDescriptionSuccess(peerConnection, "setLocalDescription");
    }

    function setRemoteDescriptionSuccess(peerConnection) {
      setDescriptionSuccess(peerConnection, "setRemoteDescription");
    }

    const createdOffer = description => {
      trace(`Offer from localPeerConnection:\n${description.sdp}`);
      trace(`localPeerConnection setLocalDescription start.`);
      localPeerConnection
        .setLocalDescription(description)
        .then(() => {
          setLocalDescriptionSuccess(localPeerConnection);
        })
        .catch(setSessionDescriptionError);

      trace("remotePeerConnection setRemoteDescription start.");
      remotePeerConnection
        .setRemoteDescription(description)
        .then(() => {
          setRemoteDescriptionSuccess(remotePeerConnection);
        })
        .catch(setSessionDescriptionError);

      trace("remotePeerConnection createAnswer start.");
      remotePeerConnection
        .createAnswer()
        .then(createdAnswer)
        .catch(setSessionDescriptionError);
    };

    function createdAnswer(description) {
      trace(`Answer from remotePeerConnection:\n${description.sdp}`);
      trace(`remotePeerConnection setLocalDescription start.`);
      remotePeerConnection
        .setLocalDescription(description)
        .then(() => {
          setLocalDescriptionSuccess(remotePeerConnection);
        })
        .catch(setSessionDescriptionError);

      trace("localPeerConnection setRemoteDescription start.");
      localPeerConnection
        .setRemoteDescription(description)
        .then(() => {
          setRemoteDescriptionSuccess(localPeerConnection);
        })
        .catch(setSessionDescriptionError);
    }

    const startButton = document.getElementById("webCam-startButton");
    const callButton = document.getElementById("webCam-callButton");
    const hangupButton = document.getElementById("webCam-hangupButton");

    callButton.disabled = true;
    hangupButton.disabled = true;

    const startAction = () => {
      startButton.disabled = true;
      navigator.mediaDevices
        .getUserMedia(mediaStreamConstraints)
        .then(gotLocalMediaStream)
        .catch(handleLocalMediaStreamError);
      trace(`Requesting local stream.`);
    };

    const callAction = () => {
      callButton.disabled = true;
      hangupButton.disabled = false;
      trace("Starting call.");
      startTime = window.performance.now();

      const videoTracks = localStream.getVideoTracks();
      const audioTracks = localStream.getAudioTracks();

      if (videoTracks.length > 0)
        trace(`Using video device: ${videoTracks[0].label}.`);

      if (audioTracks.length > 0)
        trace(`Using audio device: ${audiTracks[0].label}`);

      const servers = null;

      localPeerConnection = new RTCPeerConnection(servers);
      trace("Created local peer connection object localPeerConnection");

      localPeerConnection.addEventListener("icecandidate", handleConnection);
      localPeerConnection.addEventListener(
        "iceconnectionstatechange",
        handleConnectionChange
      );

      remotePeerConnection = new ETCPeerConnection(servers);
      trace("Created remote peer connection object RemotePeerConnection.");

      remotePeerConnection.addEventListener("icecandidate", handleConnection);
      remotePeerConnection.addEventListener(
        "iceconnectionstatechange",
        handleConnectionChange
      );
      remotePeerConnection.addEventListener("addstream", gotRemoteMediaStream);

      localPeerConnection.addStream(localStream);
      trace("Added local stream to localPeerConnection.");

      trace("localPeerConnection createOffer start.");
      localPeerConnection
        .createOffer(offerOptions)
        .then(createdOffer)
        .catch(setSessionDescriptionError);
    };

    const hangupAction = () => {
      localPeerConnection.close();
      remotePeerConnection.close();
      localPeerConnection = null;
      remotePeerConnection = null;
      hangupButton.disabled = true;
      callButton.disabled = false;
      trace("Ending call.");
    };

    startButton.addEventListener("click", startAction);
    callButton.addEventListener("click", callAction);
    hangupButton.addEventListener("click", hangupAction);
//#endregion

//#region Chat
    let localConnection;
    let remoteConnection;
    let sendChannel;
    let receiveChannel;
    let pcConstraint;
    let dataConstraint;
    let dataChannelSend = document.querySelector("textarea#webCam-chatSend");
    let dataChannelReceive = document.querySelector(
      "textarea#webCam-chatReceive"
    );
    let startChatButton = document.querySelector(
      "button#webCam-startChatButton"
    );
    let sendChatButton = document.querySelector("button#webCam-sendChatButton");
    let closeChatButton = document.querySelector(
      "button#webCam-closeChatButton"
    );

    startChatButton.onclick = createConnection;
    sendChatButton.onclick = sendData;
    closeChatButton.onclick = closeDataChannels;

    const enableStartChatButton = () => {
      sendChatButton.disabled = false;
    };

    const disableSendButton = () => {
      sendChatButton.disabled = false;
    };

    function createConnection() {
      dataChannelSend.placeholder = "";
      const servers = null;
      pcConstraint = null;
      dataConstraint = null;
      trace("USING SCTP based data channels");
      window.localConnection = localConnection = new RTCPeerConnection(
        servers,
        pcConstraint
      );
      trace("Created local peer connection object localConnection");
      sendChannel = localConnection.createDataChannel(
        "sendDataChannel, dataConstraint"
      );
      trace("Created send data channel");

      localConnection.onicecandidate = iceCallback1;
      sendChannel.onopen = onSendChannelStateChange;
      sendChannel.onclose = onSendChannelStateChange;

      window.remoteConnection = remoteConnection = new RTCPeerConnection(
        servers,
        pcConstraint
      );
      trace("Created remote peer connection object remoteConnection");

      remoteConnection.onicecandidate = iceCallback2;
      remoteConnection.ondatachannel = receiveChannelCallback;

      localConnection
        .createOffer()
        .then(gotDescription1, onCreateSessionDescriptionError);
      startChatButton.disabled = true;
      closeChatButton.disabled = false;
    }

    function onCreateSessionDescriptionError(error) {
      trace("Failed to create session description: " + error.toString());
    }

    function sendData() {
      const data = dataChannelSend.value;
      sendChannel.send(data);
      trace("Sent Data: " + data);
    }

    function closeDataChannels() {
      trace("Closing data channels");
      sendDataChannel.cllse();
      trace("Closed data channel with label: " + sendChannel.label);
      receiveChannel.close();
      trace("Closed data channel with label: " + receiveChannel.label);
      localConnection.close();
      remoteConnection.close();
      localConnection = null;
      remoteConnection = null;
      trace("Closed peer connections");
      startChatButton.disabled = false;
      sendChatButton.disabled = true;
      dataChannelSend.value = "";
      dataChannelReceive.value = "";
      dataChannelSend.disabled = true;
      disableSendButton();
      enableStartButton();
    }

    function gotDescription1(desc) {
      localConnection.setLocalDescription(desc);
      trace("Offer from localConnection \n" + desc.sdp);
      remoteConnection.setRemoteDescription(desc);
      remoteConnection
        .createAnswer()
        .then(gotDescription2, onCreateSessionDescriptionError);
    }

    function gotDescription2(desc) {
      remoteConnection.setLocalDescription(desc);
      trace("Answer from remoteConnection \n" + desc.sdp);
      localConnection.setRemoteDescription(desc);
    }

    function iceCallback1(event) {
      trace("local ice callback");
      if (event.candidate) {
        remoteConnection
          .addIceCandidate(event.candidate)
          .then(onAddIceCandidateSuccess, onAddIceCandidateError);
        trace("Local ICE candidate: \n" + event.candidate.candidate);
      }
    }

    function iceCallback2(event) {
      trace("remote ice callback");
      if (event.candidate) {
        localConnection
          .addIceCandidate(event.candidate)
          .then(onAddIceCandidateSuccess, onAddIceCandidateError);
        trace("Remote ICE candidate: \n " + event.candidate.candidate);
      }
    }

    function onAddIceCandidateSuccess() {
      trace("AddIceCandidate success.");
    }

    function onAddIceCandidateError(error) {
      trace("Failed to add Ice Candidate: " + error.toString());
    }

    function receiveChannelCallback(event) {
      trace("Receive Channel Callback");
      receiveChannel = event.channel;
      receiveChannel.onmessage = onReceiveMessageCallback;
      receiveChannel.onopen = onReceiveChannelStateChange;
      receiveChannel.onclose = onReceiveChannelStateChange;
    }

    function onReceiveMessageCallback(event) {
      trace("Received Message");
      dataChannelReceive.value = event.data;
    }

    function onSendChannelStateChange() {
      let readyState = sendChannel.readyState;
      trace("Send channel state is: " + readyState);
      if (readyState === "open") {
        dataChannelSend.disabled = false;
        dataChannelSend.focus();
        sendChatButton.disabled = false;
        closeChatButton.disabled = false;
      } else {
        dataChannelSend.disabled = true;
        sendChatButton.disabled = true;
        closeChatButton.disabled = true;
      }
    }

    function onReceiveChannelStateChange() {
      var readyState = receiveChannel.readyState;
      trace("Receive channel state is: " + readyState);
    }
//#endregion
  }

  render() {
    return (
      <div className="webCam-container">
        <video className="webCam-localVideo" id="webCam-localVideo" autoPlay />
        <video
          className="webCam-remoteVideo"
          id="webCam-remoteVideo"
          autoPlay
        />
        <div>
          <button id="webCam-startButton">Start</button>
          <button id="webCam-callButton">Call</button>
          <button id="webCam-hangupButton">Hang Up</button>
          <button id="webCam-startChatButton">Start Chat</button>
          <button id="webCam-sendChatButton">Send Chat</button>
          <button id="webCam-closeChatButton">Close Chat</button>
        </div>
        <div>
          <textarea
            id="webCam-chatSend"
            disabled
            placeholder="Press Start, enter some text, then press Send."
          />
          <textarea id="webCam-chatReceive" disabled />
        </div>
      </div>
    );
  }
}

export default WebCam;

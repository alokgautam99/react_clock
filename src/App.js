import React, { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(new Date());
  const [isClockRunning, setIsClockRunning] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTime, setEditedTime] = useState("");

  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTime, setDraggedTime] = useState(null);

  useEffect(() => {
    let timer = null;

    if (isClockRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = new Date(prevTime.getTime());
          newTime.setSeconds(newTime.getSeconds() + 1);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isClockRunning]);

  useEffect(() => {
    if (isDragging && draggedTime) {
      setTime(draggedTime);
    }
  }, [isDragging, draggedTime]);

  const handleTimeChange = (event) => {
    setEditedTime(event.target.value);
  };

  const handleTimeUpdate = () => {
    if (editedTime !== "") {
      const [minutes, seconds] = editedTime.split(":");
      const currentTime = new Date();
      const newTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        currentTime.getHours(),
        minutes,
        seconds
      );

      setTime(newTime);
    }

    setIsEditing(false);

    if (!isClockRunning) {
      setIsClockRunning(true);
    }
  };

  const toggleClockRunning = () => {
    if (!isEditing) {
      setIsClockRunning(!isClockRunning);
    }
  };

  const handleMinuteHandDragStart = (event) => {
    event.preventDefault();
    setIsDragging(true);
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - containerRect.left;
    const offsetY = clientY - containerRect.top;
    const minuteDegrees =
      Math.atan2(
        offsetY - containerRect.height / 2,
        offsetX - containerRect.width / 2
      ) *
        (180 / Math.PI) +
      90;
    const minutes = Math.floor(minuteDegrees / 6);
    const currentTime = new Date();
    const newTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours(),
      minutes,
      currentTime.getSeconds()
    );
    setDraggedTime(newTime);
  };

  const handleMinuteHandDragMove = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - containerRect.left;
    const offsetY = clientY - containerRect.top;
    const minuteDegrees =
      Math.atan2(
        offsetY - containerRect.height / 2,
        offsetX - containerRect.width / 2
      ) *
        (180 / Math.PI) +
      90;
    const minutes = Math.floor(minuteDegrees / 6);
    const currentTime = new Date();
    const newTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours(),
      minutes,
      currentTime.getSeconds()
    );
    setDraggedTime(newTime);
  };

  const handleMinuteHandDragEnd = () => {
    setIsDragging(false);
  };

  const handleSecondHandDragStart = (event) => {
    event.preventDefault();
    setIsDragging(true);
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - containerRect.left;
    const offsetY = clientY - containerRect.top;
    const secondDegrees =
      Math.atan2(
        offsetY - containerRect.height / 2,
        offsetX - containerRect.width / 2
      ) *
        (180 / Math.PI) +
      90;
    const seconds = Math.floor(secondDegrees / 6);
    const currentTime = new Date();
    const newTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes(),
      seconds
    );
    setDraggedTime(newTime);
  };

  const handleSecondHandDragMove = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - containerRect.left;
    const offsetY = clientY - containerRect.top;
    const secondDegrees =
      Math.atan2(
        offsetY - containerRect.height / 2,
        offsetX - containerRect.width / 2
      ) *
        (180 / Math.PI) +
      90;
    const seconds = Math.floor(secondDegrees / 6);
    const currentTime = new Date();
    const newTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes(),
      seconds
    );
    setDraggedTime(newTime);
  };

  const handleSecondHandDragEnd = () => {
    setIsDragging(false);
  };

  const getMinuteHandStyle = () => {
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const minuteDegrees = minutes * 6 + seconds * (6 / 60);
    return {
      transform: `rotate(${minuteDegrees}deg)`,
      width: "3px",
      height: "80px",
      backgroundColor: "#666",
      position: "absolute",
      left: "50%",
      bottom: "50%",
      transformOrigin: "bottom center",
      transition: "transform 0.2s",
      cursor: isEditing || isDragging ? "pointer" : "default"
    };
  };

  const getSecondHandStyle = () => {
    const seconds = time.getSeconds();

    const secondDegrees = seconds * 6;
    return {
      transform: `rotate(${secondDegrees}deg)`,
      width: "2px",
      height: "90px",
      backgroundColor: "#f00",
      position: "absolute",
      left: "50%",
      bottom: "50%",
      transformOrigin: "bottom center",
      transition: "transform 0.2s",
      cursor: isEditing || isDragging ? "pointer" : "default"
    };
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    cursor: isEditing ? "text" : "pointer"
  };

  const analogClockStyle = {
    position: "relative",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0"
  };

  const centerCircleStyle = {
    position: "absolute",
    left: "50%",
    bottom: "50%",
    transform: "translate(-50%, -50%)",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#333"
  };

  const digitalClockStyle = {
    marginTop: "10px",
    fontSize: "24px",
    fontWeight: "bold",
    color: isEditing ? "#333" : "#007bff",
    userSelect: isEditing ? "auto" : "none"
  };

  return (
    <div style={containerStyle} onClick={toggleClockRunning}>
      <div style={analogClockStyle} ref={containerRef}>
        <div
          style={getMinuteHandStyle()}
          ref={minuteHandRef}
          onTouchStart={handleMinuteHandDragStart}
          onTouchMove={handleMinuteHandDragMove}
          onTouchEnd={handleMinuteHandDragEnd}
          onMouseDown={handleMinuteHandDragStart}
          onMouseMove={handleMinuteHandDragMove}
          onMouseUp={handleMinuteHandDragEnd}
        ></div>
        <div
          style={getSecondHandStyle()}
          ref={secondHandRef}
          onTouchStart={handleSecondHandDragStart}
          onTouchMove={handleSecondHandDragMove}
          onTouchEnd={handleSecondHandDragEnd}
          onMouseDown={handleSecondHandDragStart}
          onMouseMove={handleSecondHandDragMove}
          onMouseUp={handleSecondHandDragEnd}
        ></div>
        <div style={centerCircleStyle}></div>
      </div>
      <input
        type="text"
        style={digitalClockStyle}
        value={
          isEditing
            ? editedTime
            : time.toLocaleTimeString([], {
                minute: "2-digit",
                second: "2-digit"
              })
        }
        onChange={handleTimeChange}
        onFocus={() => setIsEditing(true)}
        onBlur={handleTimeUpdate}
      />
    </div>
  );
}

export default App;

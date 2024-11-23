//% icon="\uf3fd"
namespace RoverControl {

    /**
     * Move the rover forward for a specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="move forward at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    export function moveForwardFor(speed: number, ms: number): void {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, speed);
        basic.pause(ms);   // Wait for the specified duration
        stopRover();       // Stop the motors
    }

    /**
     * Move the rover backward for a specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="move backward at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    export function moveBackwardFor(speed: number, ms: number): void {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P14, speed);
        basic.pause(ms);   // Wait for the specified duration
        stopRover();       // Stop the motors
    }

    /**
     * Turn the rover right for a specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="turn right at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    export function turnRightFor(speed: number, ms: number): void {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, speed);
        basic.pause(ms);   // Wait for the specified duration
        stopRover();       // Stop the motors
    }

    /**
     * Turn the rover left for a specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="turn left at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    export function turnLeftFor(speed: number, ms: number): void {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P14, speed);
        basic.pause(ms);   // Wait for the specified duration
        stopRover();       // Stop the motors
    }

    /**
     * Move the rover forward
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="move forward at $speed\\% speed"
    //% speed.min=0 speed.max=100
    export function moveForward(speed: number): void {
        // Left motor forward, right motor backward
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, speed);
    }

    /**
     * Move the rover backward
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="move backward at $speed\\% speed"
    //% speed.min=0 speed.max=100
    export function moveBackward(speed: number): void {
        // Left motor backward, right motor forward
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P14, speed);
    }

    /**
     * Turn the rover right
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="turn right at $speed\\% speed"
    //% speed.min=0 speed.max=100
    export function turnRight(speed: number): void {
        // Both motors spin in the same direction to turn right
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, speed);
    }

    /**
     * Turn the rover left
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="turn left at $speed\\% speed"
    //% speed.min=0 speed.max=100
    export function turnLeft(speed: number): void {
        // Both motors spin in the same direction to turn left
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P13, speed);
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P14, speed);
    }

    /**
     * Stop the rover
     */
    //% block="stop"
    //% weight=0
    export function stopRover(): void {
        // Stop both motors by setting speed to 0
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, 0);
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, 0);
    }

    /**
     * Get distance from the sonar sensor in the specified units
     * @param unit the unit of measurement (Centimeters, Inches, Microseconds), eg: PingUnit.Centimeters
     * @returns distance measured in the specified unit
     */
    //% blockId="rover_read_distance" block="distance from objects in %unit"
    //% unit.defl=PingUnit.Centimeters
    //% blockNamespace=RoverControl
    //% group="Sensors"
    //% weight=100
    export function readDistance(unit: PingUnit): number {
        return sonar.ping(DigitalPin.P0, DigitalPin.P1, unit);
    }

    /**
     * Boolean - get whether or not the left sensor is touching black
     * @param threshold the threshold for activating, eg: 500
     * @returns true if the left sensor detects black
     */
    //% blockId="detect_black_left" block="is left sensor touching black at threshold %threshold"
    //% threshold.defl=500
    //% blockNamespace=RoverControl
    //% group="Sensors"
    //% weight=90
    export function isLeftSensorTouchingBlack(threshold: number): boolean {
        const leftSensorValue = pins.analogReadPin(AnalogPin.P0);
        return leftSensorValue < threshold;
    }

    /**
     * Boolean - get whether or not the right sensor is touching black
     * @param threshold the threshold for activating, eg: 500
     * @returns true if the right sensor detects black
     */
    //% blockId="detect_black_right" block="is right sensor touching black at threshold %threshold"
    //% threshold.defl=500
    //% blockNamespace=RoverControl
    //% group="Sensors"
    //% weight=80
    export function isRightSensorTouchingBlack(threshold: number): boolean {
        const rightSensorValue = pins.analogReadPin(AnalogPin.P1);
        return rightSensorValue < threshold;
    }

    /**
     * Move the tank backward at specified speed
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="move tank backward at $speed\\% speed"
    //% speed.min=0 speed.max=100
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankMoveBackward(speed: number) {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, speed)
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P14, speed)
    }

    /**
     * Move the tank backward for specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="move tank backward at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankMoveBackwardFor(speed: number, ms: number) {
        tankMoveBackward(speed)
        basic.pause(ms)
        stopRover()
    }

    /**
     * Turn the tank left at specified speed
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="turn tank left at $speed\\% speed"
    //% speed.min=0 speed.max=100
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankTurnLeft(speed: number) {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P13, speed)
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, speed)
    }

    /**
     * Turn the tank left for specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="turn tank left at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankTurnLeftFor(speed: number, ms: number) {
        tankTurnLeft(speed)
        basic.pause(ms)
        stopRover()
    }

    /**
     * Move the tank forward at specified speed
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="move tank forward at $speed\\% speed"
    //% speed.min=0 speed.max=100
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankMoveForward(speed: number) {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P13, speed)
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P14, speed)
    }

    /**
     * Move the tank forward for specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="move tank forward at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankMoveForwardFor(speed: number, ms: number) {
        tankMoveForward(speed)
        basic.pause(ms)
        stopRover()
    }

    /**
     * Turn the tank right at specified speed
     * @param speed percentage of speed (0-100), eg: 50
     */
    //% block="turn tank right at $speed\\% speed"
    //% speed.min=0 speed.max=100
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankTurnRight(speed: number) {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P13, speed)
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P14, speed)
    }

    /**
     * Turn the tank right for specified time
     * @param speed percentage of speed (0-100), eg: 50
     * @param ms duration in milliseconds, eg: 1000
     */
    //% block="turn tank right at $speed\\% speed for $ms ms"
    //% speed.min=0 speed.max=100
    //% ms.shadow=timePicker
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankTurnRightFor(speed: number, ms: number) {
        tankTurnRight(speed)
        basic.pause(ms)
        stopRover()
    }

    /**
     * Open the tank gripper
     */
    //% block="open gripper"
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankGripperOpen() {
        pins.servoWritePin(AnalogPin.P15, 105)
    }
    
    /**
     * Close the tank gripper
     */
    //% block="close gripper"
    //% blockNamespace=RoverControl
    //% group="Tank"
    export function tankGripperClose() {
        pins.servoWritePin(AnalogPin.P15, 135)
    }


}

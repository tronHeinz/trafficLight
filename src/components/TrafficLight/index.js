import TrafficLight from './TrafficLight';

if (!customElements.get('traffic-light')) {
    customElements.define('traffic-light', TrafficLight);
}
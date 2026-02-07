// STORAGE KEYS

const FREELANCERS = "skillconnect_freelancers";
const CLIENTS = "skillconnect_clients";


// INIT STORAGE

function initStorage() {

if (!localStorage.getItem(FREELANCERS)) {
localStorage.setItem(FREELANCERS, JSON.stringify([]));
}

if (!localStorage.getItem(CLIENTS)) {
localStorage.setItem(CLIENTS, JSON.stringify([]));
}

}

initStorage();


// GET FREELANCERS

function getFreelancers() {
return JSON.parse(localStorage.getItem(FREELANCERS));
}


// SAVE FREELANCERS

function saveFreelancers(data) {
localStorage.setItem(FREELANCERS, JSON.stringify(data));
}


// GET CLIENTS

function getClients() {
return JSON.parse(localStorage.getItem(CLIENTS));
}


// SAVE CLIENTS

function saveClients(data) {
localStorage.setItem(CLIENTS, JSON.stringify(data));
}


// GENERATE RESET CODE

function generateCode() {
return Math.floor(100000 + Math.random() * 900000);
}


// SAVE CURRENT USER SESSION

function setSession(user, type) {

localStorage.setItem("skillconnect_session", JSON.stringify({
user,
type
}));

}


// GET SESSION

function getSession() {

return JSON.parse(localStorage.getItem("skillconnect_session"));

}


// LOGOUT

function logout() {
localStorage.removeItem("skillconnect_session");
}


// DELETE FREELANCER

function deleteFreelancer(email) {

let freelancers = getFreelancers();

freelancers = freelancers.filter(user => user.email !== email);

saveFreelancers(freelancers);

}


// DELETE CLIENT

function deleteClient(email) {

let clients = getClients();

clients = clients.filter(user => user.email !== email);

saveClients(clients);

}


// LOCATION FETCH

function getLocation(callback) {

if (!navigator.geolocation) {
alert("Location not supported");
return;
}

navigator.geolocation.getCurrentPosition(

async position => {

let lat = position.coords.latitude;
let lon = position.coords.longitude;

let url =
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

let res = await fetch(url);
let data = await res.json();

let city =
data.address.city ||
data.address.town ||
data.address.village ||
"";

let state = data.address.state || "";

callback(`${city}, ${state}`);

},

() => alert("Location permission denied")

);

}


// MATCH FREELANCERS

function findFreelancers(skill, location) {

let freelancers = getFreelancers();

return freelancers.filter(user =>
user.skill === skill &&
user.location === location
);

                          }


const url = 'https://heatwaveprojekt.azurewebsites.net/api/temp';

Vue.createApp({
    data() {
        return {
            Measurements: [],
            error: "",
            addMessage: "",
                AddMeasurement: {
                IndoorTemperature: 0,
                OutDoorTemperature: 0,
                Date: 0,
            }
        };
    },
    created() {
        this.getAll();
    },
    methods: {
        async getAll() {
            try {
                const response = await axios.get(url);
                this.Measurements = response.data;
            } catch (error) {
                this.error = error.message;
            }
        },
        async addMeasurement() {
            try {
                response = await axios.post(url, this.AddMeasurement);
                this.addMessage = "response " + response.status + " " + response.statusText;
                this.getAll();
            } catch (ex) {
                alert(ex.message);
            }
        }
    }
}).mount("#App");

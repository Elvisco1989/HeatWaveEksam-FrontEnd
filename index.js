

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
            },
            updateMessage: "",
            updateData: {
                id: 0,
                IndoorTemperature: 0,
                OutDoorTemperature: 0,
                Date: 0,

            },
            isVisable: false,
            currentMeasurement: null,// Initialize to null
            recommendedTemp: true,
            
            };
        },
        computed: {
            temperatureDifference: function () {
                return this.currentMeasurement.inDoorTemperature - this.currentMeasurement.outDoorTemperature;

            },
        }, // Add a comma here
        created() {
            this.getAll();
            this.getCurrentMeasurementWithMaxId(); // Call the method to get the current measurement with the maximum ID
        },
        methods: {
            toggleTable() {
                this.isVisable = !this.isVisable;
            },
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
                    const response = await axios.post(url, this.AddMeasurement);
                    this.addMessage = "response " + response.status + " " + response.statusText;
                    this.getAll();
                } catch (ex) {
                    alert(ex.message);
                }
            },
        async updateMeasurement() {
                const updateUrl = url + "/" + this.updateData.id; // Changed variable name to avoid conflict
                try {
                    const response = await axios.put(updateUrl, this.updateData); // Added 'const' to define the response variable
                    this.updateMessage = "response " + response.status + " " + response.statusText;
                    this.getAll();
                } catch (ex) {
                    alert(ex.message);
                }
            },
            getCurrentMeasurementWithMaxId() {
                // const Measurements = this.getAll();
                if (this.Measurements.length > 0) {
                    // Get the last item in the array
                    const lastMeasurement = this.Measurements[this.Measurements.length - 1];

                    // Set the currentMeasurement to the last measurement
                    this.currentMeasurement = lastMeasurement;
                }
            },
            // temperatureDifference() {
            //     // Get the current measurement with the maximum ID
            //     this.getCurrentMeasurementWithMaxId();

            //     // Check if the currentMeasurement is not null
            //     if (this.currentMeasurement != null) {
            //         // Calculate the temperature difference
            //         temperatureDifference = this.currentMeasurement.IndoorTemperature - this.currentMeasurement.OutDoorTemperature;
            //         // Return the temperature difference
            //         return temperatureDifference;
            //     } else { // If the currentMeasurement is null
            //         // Return a message indicating no measurements available
            //         System.out.println("No measurements available");
            //         return 0; // or you can return NaN (Not a Number) to indicate invalid result
            //     }
            // }


        }
    }).mount("#App");


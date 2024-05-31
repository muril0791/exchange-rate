<template>
    <div>
        <span :class="`inline-block w-4 h-4 rounded-full mt-3 ${badgeColor}`"></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            result: 'Iniciando...',
            latency: 0,
        };
    },
    computed: {
        badgeColor() {
            if (this.latency < 100) {
                return 'bg-green-500';
            } else if (this.latency >= 100 && this.latency < 200) {
                return 'bg-yellow-500';
            } else if (this.latency >= 200 && this.latency < 300) {
                return 'bg-red-500';
            } else {
                return 'bg-black'; // Para latências muito altas
            }
        }
    },
    methods: {
        async pingWithFetch(url) {
            try {
                const start = performance.now();
                await fetch(url, { mode: 'no-cors' });
                const latency = performance.now() - start;
                this.latency = latency;
                this.result = `${latency.toFixed(2)}ms`;
            } catch (error) {
                this.result = `Erro ao pingar ${url} via Fetch: ${error}`;
                this.latency = 0; // Resetar latência em caso de erro
            }
        },
    },
    mounted() {
        this.pingWithFetch('https://www.google.com'); // Faz o primeiro ping ao carregar
        setInterval(() => {
            this.pingWithFetch('https://www.google.com'); // Continua pingando a cada 30 segundos
        }, 30000); // 30000 ms = 30 segundos
    },
};
</script>

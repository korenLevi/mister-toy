

<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  //   props: {
  //     toysData: {
  //       type: Array,
  //       required: true,
  //     },
  //   },
  props: ["toysData"],
  created() {
    console.log("this.toysDatat", this.toysData);
  },
  mounted() {
    this.renderChart({
      labels: ["Adult", "Funny", "Educational"],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: ["#f87979", "#11A8AB", "#4FC4F6"],
          data: this.toysData,
        },
      ],
    });
  },
};

// @toysChart="toysChart"
</script>
<style>
</style>

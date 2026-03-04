export interface Rank {
  title: string;
  color: string;
  frameColor: string;
  icon: any;
}

export const getRank = (streak: number): Rank => {

  if (streak >= 180) {
    return {
      title: "Huyền thoại tài chính 🏆",
      color: "#FFC93C", 
      frameColor: "#FFC93C",
      icon: require("../../../assets/images/rank/5.png"),
    };
  }

  if (streak >= 90) {
    return {
      title: "Bậc thầy tích lũy 👑",
      color: "#FF8C42",  
      frameColor: "#FF8C42",
      icon: require("../../../assets/images/rank/4.png"),
    };
  }

  if (streak >= 30) {
    return {
      title: "Chiến binh tiết kiệm 💎",
      color: "#2ECC71", 
      frameColor: "#2ECC71",
      icon: require("../../../assets/images/rank/3.png"),
    };
  }

  if (streak >= 7) {
    return {
      title: "Kỷ luật viên 🔥",
      color: "#36C2FF",  
      frameColor: "#36C2FF",
      icon: require("../../../assets/images/rank/2.png"),
    };
  }

  return {
    title: "Người mới bắt đầu 🌱",
    color: "#9E9E9E" ,
    frameColor: "#9E9E9E",
    icon: require("../../../assets/images/rank/1.png"),
  };
};
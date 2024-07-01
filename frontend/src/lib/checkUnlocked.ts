import axios from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { BACKEND_URL } from "./constant";
import Swal from "sweetalert2";

interface Progress {
  locationA?: boolean;
  locationB?: boolean;
  locationC?: boolean;
  locationD?: boolean;
  locationE?: boolean;
  locationF?: boolean;
}

interface UserData {
  progress: Progress;
}

const checkUnlocked = async ({ params }: LoaderFunctionArgs) => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("No token found");
    }

    const { data } = await axios.get<UserData>(`${BACKEND_URL}/explore/mine`, {
      headers: { access_token },
    });
    if (!data) throw new Error("Not unlocked");

    // if now unlocked throw error, use Swal too (sweet alert)
    const chapterNumber = Number(params.chapter);
    let tempCount = 0;
    if (data?.progress?.locationA) {
      tempCount += 1;
    }
    if (data?.progress?.locationB) {
      tempCount += 1;
    }
    if (data?.progress?.locationC) {
      tempCount += 1;
    }
    if (data?.progress?.locationD) {
      tempCount += 1;
    }
    if (data?.progress?.locationE) {
      tempCount += 1;
    }
    if (data?.progress?.locationF) {
      tempCount += 1;
    }
    if (isNaN(chapterNumber)) throw new Error("Invalid chapter number");

    if (tempCount >= chapterNumber) {
      return data;
    }

    throw new Error("Not unlocked");
  } catch (error) {
    // Show SweetAlert error message
    await Swal.fire({
      title: "Oops",
      text: "Tolong unlock terlebih dahulu dengan mencari kristal",
      icon: "error",
      confirmButtonText: "OK",
    });
    return redirect("/game/story"); // Redirect to login if not admin or error occurs
  }
};

export default checkUnlocked;

import { useLocation } from "react-router-dom";

const useIsHistoryPage = () => {
    const location = useLocation();
    return location.pathname.includes("/history");
};

export default useIsHistoryPage;
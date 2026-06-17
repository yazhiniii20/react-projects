import KnowledgeHub from "../KnowledgeHub";
import DashBoardLayout from "../layouts/DashBoardLayout";

function DashboardPage({ setIsLoggedIn}){
    return(
     <DashBoardLayout>
        <KnowledgeHub setIsLoggedIn={setIsLoggedIn}/>
    </DashBoardLayout>
    );
}

export default DashboardPage;
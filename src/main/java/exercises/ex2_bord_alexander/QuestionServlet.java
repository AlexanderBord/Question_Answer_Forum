package exercises.ex2_bord_alexander;


import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * The type Question servlet.
 */
@WebServlet(name = "QuestionServlet", value = "/QuestionServlet", initParams={@WebInitParam(name="fileName", value="questions")})
public class QuestionServlet extends HttpServlet {

    /**
     * The Questions.
     */
    Question questions = new Question();
    /**
     * The Answers.
     */
    Answer answers;

    @Override
    public void init() {

        String fileName = this.getServletConfig().getInitParameter("fileName");
        String filePath = getServletContext().getRealPath(fileName);
        questions.readFile(filePath);
        answers = new Answer(questions.getList().size());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        session.setAttribute("questionList", questions);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            PrintWriter out = response.getWriter();
            out.print(questions.getList());
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String n = request.getParameter("name");
        String a = request.getParameter("answer");
        String q = request.getParameter("question");

        if(a == null){
            response.sendRedirect("index.html");
        }
        else{
            answers.setAnswer(Integer.parseInt(q), n, a);
            HttpSession session = request.getSession(true);
            session.setAttribute("answerList", answers);
            request.getRequestDispatcher("index.html").include(request, response);
        }
    }
}

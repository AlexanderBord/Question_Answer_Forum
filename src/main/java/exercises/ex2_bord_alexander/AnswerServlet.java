package exercises.ex2_bord_alexander;

import com.google.gson.Gson;

import javax.json.JsonObject;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

/**
 * The type Answer servlet.
 */
@WebServlet(name = "AnswerServlet", value = "/AnswerServlet")
public class AnswerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        Question q = (Question) session.getAttribute("questionList");

        String n = request.getParameter("qn");

        response.addCookie(new Cookie("questionNumber",n));
        int num = Integer.parseInt(n);

        PrintWriter out = response.getWriter();
        response.setContentType("text/html");

        out.println("<div class=\"container-fluid\"> " + "<h1> Exercise 2 </h1>");
        out.println("<h2> Answer this question: </h2>");
        out.println("<h3> " + q.getQuestion(num) + "</h3>" + "</div>");
        request.getRequestDispatcher("answer.html").include(request,response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


            BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
            String a = br.readLine();

            int temp = Integer.parseInt(String.valueOf(a.charAt(10)));

            HttpSession session = request.getSession(true);
            Answer answer = (Answer) session.getAttribute("answerList");

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

        try {
            PrintWriter out = response.getWriter();
            out.print(answer.getAnswer(temp));
            out.flush();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

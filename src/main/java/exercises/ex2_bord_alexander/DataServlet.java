package exercises.ex2_bord_alexander;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Arrays;

/**
 * The type Data servlet.
 */
@WebServlet(name = "DataServlet", value = "/DataServlet")
public class DataServlet extends HttpServlet {

    /**
     * The Answer counter.
     */
    Integer[] answerCounter = {0,0,0};

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String index = request.getParameter("i");
        int i = Integer.parseInt(index);
        answerCounter[i] += 1;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            PrintWriter out = response.getWriter();
            out.print(Arrays.toString(answerCounter));
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

package exercises.ex2_bord_alexander;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * The type Question.
 */
public class Question {

    private ArrayList<String> QuestionList =  new ArrayList<>();

    /**
     * Instantiates a new Question.
     */
    public Question(){
    }

    /**
     * Get list array list.
     *
     * @return the array list
     */
    public ArrayList<String> getList(){
        return QuestionList;
    }

    /**
     * Get question string.
     *
     * @param questionNumber the question number
     * @return the string
     */
    public String getQuestion(int questionNumber){
        return QuestionList.get(questionNumber);
    }

    /**
     * Read file.
     *
     * @param filePath the file path
     */
    public void readFile(String filePath){

        try {
            File myObj = new File(filePath + ".txt");
            Scanner myReader = new Scanner(myObj);

            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                QuestionList.add(data);
            }
            myReader.close();
        }
        catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}

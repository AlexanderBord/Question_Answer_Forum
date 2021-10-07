package exercises.ex2_bord_alexander;


import java.util.Arrays;


/**
 * The type Answer.
 */
public class Answer {

    private String[] answerList;

    /**
     * Instantiates a new Answer.
     *
     * @param size the size
     */
    public Answer(int size){

        answerList = new String[size];
        Arrays.fill(answerList, "");
    }

    /**
     * Get list string [ ].
     *
     * @return the string [ ]
     */
    public String[] getList(){
        return answerList;
    }

    /**
     * Get answer string.
     *
     * @param answerNumber the answer number
     * @return the string
     */
    public String getAnswer(int answerNumber){
        return answerList[answerNumber];
    }

    /**
     * Set answer.
     *
     * @param answerNumber the answer number
     * @param name         the name
     * @param answer       the answer
     */
    public void setAnswer(int answerNumber, String name, String answer){
        answerList[answerNumber] += "/" + answer + "/" + name;
    }
}

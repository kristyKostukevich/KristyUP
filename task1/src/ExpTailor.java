import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Created by Kristy on 20.12.2016.
 */
public class ExpTailor {

   private int i=2;
   private double x=12;
   private double sub;
   private double sum=1;
   private double e=0.01;

    public void printX() throws IOException {
        String t;
        System.out.println("Введите x: ");
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        t = in.readLine();
        x = Double.parseDouble(t);
        System.out.println("Введите e: ");
        t = in.readLine();
        e = Double.parseDouble(t);
    }
    public void couting() {
        sub = x;
        sum = sum + sub;
        while (Math.abs(sub) > e) {
            sub = sub * x / i;
            sum = sum + sub;
            i++;
        }
        System.out.println("Рузультат: " + sum);
        double m=Math.exp(x);
        System.out.println("Рузультат стандартной функции: "+m);
    }
    public int newE(){
        int count = 0;
        double ex=e;
        while (ex!=1)
        {
            ex*=10;
            count++;
        }
        return count;
    }
    public void bigDecimalCounting()
    {
        BigDecimal bigX = new BigDecimal(x);
        BigDecimal bigSum = new BigDecimal(0);
        BigDecimal bigSub = new BigDecimal(x);
        BigDecimal one = new BigDecimal(1);
        BigDecimal index = new BigDecimal(2);
        BigDecimal bigE= new BigDecimal(e);
        bigSum = bigSum.add(bigSub);
        while(bigSub.abs().compareTo(bigE)==1)
        {
            bigSub = bigSub.multiply(bigX);
            bigSub=bigSub.divide(index, newE(), RoundingMode.HALF_UP);
            bigSum = bigSum.add(bigSub);
            index = index.add(one);
        }
        System.out.println("Результат BigDecimal: "+(bigSum));

    }
}

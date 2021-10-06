package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class CovidService {

	private final String SERVICE_KEY = "ephHE7sqwohfWoq2hSxkRTYX6s6YD8iN9pSmEcIgQGMchtKYsZ4UBquDToO6PwKvjSU1XNWYU4lWc35E4%2F5zbw%3D%3D";

	private CovidSidoDailyRepository repo;

	@Autowired
	public CovidService(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	@CacheEvict(value = "covid-daily", allEntries = true)
	public void requestCovidSidoDaily() throws IOException {


		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi");
		builder.append("/service/rest/Covid19");
		builder.append("/getCovid19SidoInfStateJson");
		builder.append("?serviceKey=" + SERVICE_KEY);
		builder.append("&pageNo=1&numOfRows=10");
		builder.append("&startCreateDt=20211001");

		URL url = new URL(builder.toString());

		// 3. Http로 접속하려면 url를 http 접속용 객체로 바꿔야함
		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		// 4. byte[] 배열로 데이터를 읽어옴
		byte[] result = con.getInputStream().readAllBytes();

		// 5. byte[] -> 문자열 (XML) 변환
		String data = new String(result, "UTF-8");

		/* ---------------------- 데이터 요청하고 XML 받아오기 끝 ----------------- */

		/* ---------------------- XML -> JSON -> Object(Java) 시작 ----------------- */

		// XML(문자열) -> JSON(문자열)
		String json = XML.toJSONObject(data).toString(2); // 왜 2개???
//		System.out.println(json);

		// JSON(문자열) -> Java(object) 객체
		CovidSidoDailyResponse response = new Gson().fromJson(json, CovidSidoDailyResponse.class);
//		System.out.println(response);

		/* ---------------------- XML -> JSON -> Object(Java) 끝 ----------------- */

		//

		/* ---------------------- 응답 객체 -> entity 엔티티 객체 시작 ----------------- */

		List<CovidSidoDaily> list = new ArrayList<CovidSidoDaily>();
		for (CovidSidoDailyResponse.Item item : response.getResponse().getBody().getItems().getItem()) {

			CovidSidoDaily record = CovidSidoDaily.builder().stdDay(item.getStdDay()).gubun(item.getGubun())
					.gubunEn(item.getGubunEn()).overFlowCnt(item.getOverFlowCnt()).localOccCnt(item.getLocalOccCnt())
					.build();

			list.add(record);
		}
		repo.saveAll(list);

	}
}
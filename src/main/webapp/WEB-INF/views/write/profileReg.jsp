<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>


<div class="container">
    <div class="container-custom">
        <div class="col-lg-12">

            <label>
                <select id="category"></select>
            </label>
            <label>
                <input id="profileNm" type="text" placeholder="이름">
            </label>
            <label>
                <input id="backNo" type="number" placeholder="등번호">
            </label>
            <label>
                <input id="birthDate" type="datetime-local" placeholder="생일">
            </label>

            <input type="button" id="btnSubmit" value="업로드"/>
            <div id="drop" style="border:1px solid black; width:800px; height:300px; padding:3px">
                사진 파일을 드래그해 주세요.
                <div id="thumbnails">
                </div>
            </div>

        </div>
    </div>

    <script src="js/write/profileReg.js"></script>

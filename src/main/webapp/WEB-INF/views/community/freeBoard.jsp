<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="container">
    <div class="container-custom">
        <h1 class="headline"><spring:message code="FreeBoard"/></h1>
        <div class="col-lg-12">
            <%@include file="../write/list.jsp" %>
        </div>
    </div>

    <script src="js/community/freeBoard.js"></script>

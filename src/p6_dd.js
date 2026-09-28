/* ===================== ĐẠO ĐỨC 1 (Kết nối tri thức) ===================== */
/* each lesson: [id, title, learn[], questions[[prompt, pic, [correct, ...wrong]]], order|null, real] */
const DD=[
 ['Tự chăm sóc bản thân',[
  ['dd1','Em giữ sạch đôi tay',['Rửa tay bằng xà phòng trước khi ăn, sau khi đi vệ sinh và khi tay bẩn.','Rửa đúng cách: làm ướt tay, xoa xà phòng, chà kẽ ngón và móng tay, xả sạch nước, lau khô.','Tay sạch giúp em không bị đau bụng, không bị ốm.'],[
   ['Khi nào em cần rửa tay?','🧼',['Trước khi ăn cơm','Chỉ khi tay có màu đen','Một tuần một lần','Không cần rửa tay']],
   ['Rửa tay bằng gì thì sạch nhất?','🫧',['Nước sạch và xà phòng','Lau vào áo','Thổi vào tay','Nước trong vũng']],
   ['Bạn Bi vừa chơi cát xong, cầm bánh ăn luôn. Như vậy đúng hay sai?','🏖️',['Sai, phải rửa tay trước khi ăn','Đúng, vì bạn đói','Đúng, cát không bẩn']],
   ['Rửa tay xong, em làm gì?','🙌',['Lau khô tay bằng khăn sạch','Vẩy nước lên bạn','Chùi tay vào quần','Để tay ướt đi chơi']]],
   ['Làm ướt tay','Xoa xà phòng','Chà kẽ ngón tay','Xả sạch nước','Lau khô tay'],'Tự rửa tay đúng 5 bước trước mỗi bữa ăn trong 3 ngày liền, không cần ai nhắc.'],
  ['dd2','Em giữ sạch răng miệng',['Đánh răng ngày 2 lần: sáng khi ngủ dậy và tối trước khi đi ngủ.','Chải nhẹ mặt trong, mặt ngoài và mặt nhai của răng, rồi súc miệng sạch.','Ít ăn kẹo, đồ ngọt. Không cắn bút, cắn móng tay.'],[
   ['Mỗi ngày em đánh răng mấy lần?','🪥',['Ít nhất 2 lần: sáng và tối','Một tuần 1 lần','Khi nào nhớ thì đánh','Không cần đánh răng']],
   ['Buổi tối, em đánh răng lúc nào?','🌙',['Trước khi đi ngủ','Trước khi ăn tối','Lúc nửa đêm','Không đánh buổi tối']],
   ['Thói quen nào làm hại răng?','🍬',['Ăn nhiều kẹo mà không đánh răng','Uống nước lọc','Ăn rau xanh','Đánh răng buổi sáng']],
   ['Bạn Na hay cắn bút chì. Em nên nói gì với bạn?','✏️',['Cắn bút bẩn và hại răng đấy bạn','Bạn cắn tiếp đi','Cho mình cắn với','Không nói gì']],
   ['Đánh răng xong, em làm gì?','🚰',['Súc miệng và rửa sạch bàn chải','Nuốt kem đánh răng','Vứt bàn chải xuống sàn','Để bàn chải bẩn']]],
   null,'Tự đánh răng sáng và tối trong 5 ngày liền. Bố mẹ đánh dấu vào lịch mỗi lần con làm.'],
  ['dd3','Em tắm, gội sạch sẽ',['Tắm hằng ngày, gội đầu thường xuyên giúp cơ thể sạch và thơm.','Các bước: làm ướt người, xoa xà phòng, kì cọ, xả sạch, lau khô, mặc quần áo sạch.','Tắm xong lau khô tóc và người để không bị cảm.'],[
   ['Vì sao em cần tắm hằng ngày?','🛁',['Để người sạch, không bị ngứa, không ốm','Để nghịch nước','Để tốn xà phòng','Vì bạn bắt tắm']],
   ['Tắm xong, em làm gì?','🧴',['Lau khô người, mặc quần áo sạch','Chạy ra ngoài khi còn ướt','Mặc lại quần áo bẩn','Đi ngủ khi tóc còn ướt']],
   ['Đá bóng về, người đầy mồ hôi. Em làm gì?','⚽',['Tắm rửa sạch sẽ','Đi ngủ luôn','Lau mồ hôi vào rèm','Không cần làm gì']],
   ['Em nên tắm ở đâu?','🚿',['Trong nhà tắm, có người lớn trông','Ở ao hồ một mình','Ngoài sân lúc trời lạnh','Trong bể cá']]],
   ['Làm ướt người','Xoa xà phòng','Kì cọ','Xả sạch nước','Lau khô người'],'Tự tắm và gội đầu (có bố mẹ ở bên), tự lau khô và chọn quần áo sạch để mặc.'],
  ['dd4','Em giữ trang phục gọn gàng, sạch sẽ',['Quần áo cần sạch, phẳng, vừa người và hợp thời tiết.','Không lau tay, lau mũi vào áo. Không chơi chỗ bẩn làm lấm quần áo.','Quần áo bẩn bỏ vào giỏ đồ giặt. Quần áo sạch gấp gọn cất vào tủ.'],[
   ['Quần áo bẩn, em để ở đâu?','🧺',['Bỏ vào giỏ đồ bẩn','Vứt trên giường','Nhét vào gầm bàn','Để dưới sàn']],
   ['Trời lạnh, em nên mặc gì?','🥶',['Áo ấm, đội mũ, quàng khăn','Áo cộc tay','Chỉ mặc quần đùi','Đồ bơi']],
   ['Bạn Tít lau mũi vào tay áo. Như vậy có đúng không?','🤧',['Không đúng, phải dùng khăn giấy','Đúng, cho nhanh','Đúng, áo tự sạch']],
   ['Việc nào giúp quần áo gọn gàng?','👕',['Gấp quần áo sạch cất vào tủ','Vo tròn quần áo','Để quần áo khắp nhà','Giẫm lên quần áo']],
   ['Trước khi đi học, em kiểm tra trang phục thế nào?','🎒',['Cài đủ cúc, áo gọn, giày buộc dây','Mặc áo ngược','Đi một chiếc dép','Không cần nhìn']]],
   null,'Tự gấp 3 chiếc áo sạch cất vào tủ, và mỗi tối bỏ quần áo bẩn vào giỏ, làm 3 ngày liền.']]],
 ['Yêu thương gia đình',[
  ['dd5','Gia đình của em',['Gia đình là nơi em được yêu thương, chăm sóc.','Mọi người trong gia đình quan tâm, giúp đỡ nhau.','Em thể hiện tình yêu bằng lời nói và việc làm: ôm bố mẹ, nói lời yêu thương, giúp việc nhà.'],[
   ['Việc làm nào thể hiện em yêu gia đình?','🤗',['Ôm bố mẹ và nói "Con yêu bố mẹ"','Cãi lại bố mẹ','Đòi quà liên tục','Không chào khi bố mẹ về']],
   ['Mẹ đi làm về mệt. Em nên làm gì?','👩',['Lấy nước mời mẹ uống','Đòi mẹ chơi ngay','Bật ti vi thật to','Bày bừa nhà cửa']],
   ['Được bố mẹ tặng quà, em nói gì?','🎁',['Con cảm ơn bố mẹ ạ','Con không thích','Sao ít thế','Không nói gì']],
   ['Cuối tuần, cả nhà cùng dọn nhà. Em làm gì?','🧹',['Cùng làm việc vừa sức như lau bàn','Trốn đi chơi','Nằm xem ti vi','Kêu mệt']],
   ['Gia đình em gồm những ai?','🏠',['Những người thân yêu thương và chăm sóc em','Các bạn cùng lớp','Cô bán hàng','Chú bảo vệ']]],
   null,'Vẽ một bức tranh gia đình mình, rồi nói với mỗi người một câu yêu thương.']]],
 ['Quan tâm, chăm sóc người thân',[
  ['dd6','Lễ phép, vâng lời ông bà, cha mẹ, anh chị',['Chào hỏi khi đi và khi về: "Con chào bố mẹ ạ!".','Nói "ạ", "vâng ạ" khi trả lời người lớn. Nhận và đưa đồ bằng hai tay.','Vâng lời người lớn và làm theo lời khuyên đúng.'],[
   ['Đi học về, em chào thế nào?','🏡',['Con chào ông bà, bố mẹ ạ!','Ê, con về rồi!','Không chào','Chạy thẳng vào phòng']],
   ['Khi đưa đồ cho ông bà, em đưa thế nào?','🫴',['Đưa bằng hai tay','Ném cho ông bà','Đưa một tay, không nhìn','Để xuống đất']],
   ['Mẹ bảo em tắt ti vi đi ngủ. Em làm gì?','📺',['"Vâng ạ", rồi tắt ti vi','Xem tiếp','Khóc ăn vạ','Giận dỗi mẹ']],
   ['Câu trả lời nào lễ phép?','💬',['Vâng ạ, con biết rồi ạ','Biết rồi, nói mãi','Kệ con','Ừ']],
   ['Chị nhắc em cất đồ chơi. Em làm gì?','🧸',['Vâng lời, cất đồ chơi gọn','Cãi lại chị','Vứt đồ chơi','Mách mẹ là chị mắng']]],
   null,'Chào hỏi mọi người khi đi và khi về, trả lời "Vâng ạ" trong 3 ngày liền.'],
  ['dd7','Quan tâm, chăm sóc ông bà',['Ông bà đã già, cần con cháu quan tâm.','Em có thể lấy nước, lấy kính, bóp vai, trò chuyện với ông bà.','Khi ông bà ốm, em hỏi thăm và đi nhẹ, nói khẽ.'],[
   ['Việc nào em làm được để chăm sóc ông bà?','👴',['Lấy kính, lấy nước cho ông bà','Nói to khi ông bà ngủ','Nghịch đồ của ông bà','Không hỏi han ông bà']],
   ['Bà bị ốm. Em nên làm gì?','🤒',['Hỏi thăm bà, đi nhẹ nói khẽ','Chơi ồn ào','Bật nhạc to','Đòi bà chơi cùng']],
   ['Ông bà ở quê xa. Em có thể làm gì?','📞',['Gọi điện hỏi thăm ông bà','Quên ông bà','Không nghe máy','Chỉ gọi khi cần quà']],
   ['Ông đang tìm kính để đọc báo. Em làm gì?','👓',['Giúp ông tìm kính','Giấu kính của ông','Cười ông','Đi chỗ khác']],
   ['Bóp vai cho bà là việc làm thế nào?','💆',['Việc tốt, thể hiện em quan tâm bà','Việc không nên làm','Việc của người khác']]],
   null,'Làm 1 việc chăm sóc ông bà (bóp vai, lấy nước, gọi điện hỏi thăm) và kể lại cho bố mẹ.'],
  ['dd8','Quan tâm, chăm sóc cha mẹ',['Bố mẹ làm việc vất vả để chăm sóc em.','Em quan tâm bố mẹ: hỏi han, lấy nước, giúp việc nhỏ, không làm bố mẹ buồn.','Khi bố mẹ ốm, em hỏi thăm và chơi yên lặng.'],[
   ['Bố đi làm về mệt. Em nên làm gì?','👨',['Lấy dép, rót nước mời bố','Đòi bố cõng ngay','Đòi bố mua quà','Không để ý']],
   ['Mẹ đang nấu cơm. Em giúp được việc gì?','🍚',['Nhặt rau, xếp bát đũa','Nghịch bếp ga','Chạy nhảy trong bếp','Cầm dao chơi']],
   ['Mẹ bị đau đầu. Em làm gì?','🤕',['Hỏi thăm mẹ và chơi yên lặng','Hát thật to','Đập trống','Đòi mẹ đưa đi chơi']],
   ['Sinh nhật mẹ, em có thể làm gì?','🎂',['Vẽ tặng mẹ một tấm thiệp','Không nhớ','Đòi mẹ mua quà cho em','Giận mẹ']],
   ['Câu nói nào thể hiện em quan tâm bố mẹ?','💬',['Bố mẹ có mệt không ạ?','Mua đồ chơi cho con đi','Con không thích','Kệ bố mẹ']]],
   null,'Tự làm 1 tấm thiệp tặng bố hoặc mẹ, hoặc làm 1 việc giúp bố mẹ khi bố mẹ đi làm về.'],
  ['dd9','Chăm sóc, giúp đỡ em nhỏ',['Là anh chị, em nhường nhịn và giúp đỡ em nhỏ.','Em chơi cùng em, dạy em hát, cho em mượn đồ chơi.','Không để em nhỏ chơi đồ nguy hiểm như kéo, dao, ổ điện.'],[
   ['Em bé muốn chơi đồ chơi của em. Em làm gì?','🧸',['Cho em mượn và chơi cùng em','Giằng lại','Đánh em','Giấu đồ chơi']],
   ['Em bé cầm cái kéo. Em nên làm gì?','✂️',['Nhẹ nhàng lấy kéo cất đi, báo người lớn','Để em chơi tiếp','Cười','Giằng thật mạnh']],
   ['Em bé bị ngã. Em làm gì?','😢',['Đỡ em dậy, dỗ em, gọi người lớn','Cười em','Bỏ đi','Mắng em']],
   ['Việc nào là giúp đỡ em nhỏ?','👶',['Dạy em hát một bài','Trêu em khóc','Tranh đồ ăn của em','Dọa em']],
   ['Ở trường, một em lớp dưới bị lạc. Em làm gì?','🏫',['Dẫn em đến gặp cô giáo','Mặc kệ','Trêu em','Chạy đi']]],
   null,'Chơi cùng một em nhỏ (em ruột, em họ hoặc em hàng xóm) 15 phút: đọc truyện, dạy em hát hoặc xếp hình.']]],
 ['Thực hiện nội quy trường, lớp',[
  ['dd10','Đi học đúng giờ',['Đi học đúng giờ giúp em không bỏ lỡ bài học.','Tối chuẩn bị sẵn sách vở, quần áo. Sáng dậy đúng giờ.','Nếu phải đến muộn, em xin lỗi cô và xin phép vào lớp.'],[
   ['Để đi học đúng giờ, buổi tối em nên làm gì?','🌙',['Chuẩn bị sách vở và đi ngủ sớm','Xem ti vi đến khuya','Chơi điện thoại','Để sáng mới soạn cặp']],
   ['Chuông báo thức kêu. Em làm gì?','⏰',['Dậy ngay, đánh răng rửa mặt','Tắt chuông ngủ tiếp','Khóc','Trùm chăn']],
   ['Em đến lớp muộn. Em cần làm gì?','🚪',['Xin lỗi cô và xin phép vào lớp','Chạy thẳng vào chỗ','Đứng ngoài không nói','Bỏ về nhà']],
   ['Vì sao phải đi học đúng giờ?','📚',['Để học đủ bài, không làm phiền cả lớp','Để được ăn sáng ở trường','Vì bạn bắt thế','Không cần đúng giờ']],
   ['Trên đường đi học, em có nên dừng lại mải chơi không?','🛝',['Không, em đi thẳng đến trường','Có, chơi thật lâu','Có, rủ bạn trốn học']]],
   null,'Tối nào cũng tự soạn cặp sách, sáng dậy đúng giờ và không bị muộn học cả tuần.'],
  ['dd11','Học bài và làm bài đầy đủ',['Học bài và làm bài đầy đủ giúp em học giỏi.','Có góc học tập gọn gàng, học đúng giờ.','Chỗ nào chưa hiểu, em hỏi cô giáo hoặc bố mẹ.'],[
   ['Cô giao bài về nhà. Em làm gì?','📝',['Làm bài đầy đủ trước khi đi chơi','Để mai làm','Nhờ bạn làm hộ','Quên luôn']],
   ['Gặp bài khó chưa hiểu, em làm gì?','🤔',['Hỏi bố mẹ hoặc cô giáo','Bỏ trống','Chép bài của bạn','Xé vở']],
   ['Góc học tập nên thế nào?','🪑',['Gọn gàng, đủ ánh sáng','Đầy đồ chơi','Tối om','Bừa bộn']],
   ['Bạn rủ đi chơi khi em chưa học xong. Em nói gì?','🧒',['Mình học xong rồi chơi nhé','Đi luôn','Bỏ học đi chơi','Mắng bạn']],
   ['Việc nào giúp em học tốt?','⭐',['Chú ý nghe cô giảng bài','Nói chuyện trong giờ học','Ngủ gật','Vẽ bậy lên bàn']]],
   null,'Làm xong bài tập về nhà trước giờ chơi, trong 5 ngày liền.'],
  ['dd12','Giữ trật tự trong trường, lớp',['Trong giờ học không nói chuyện riêng; muốn nói thì giơ tay.','Xếp hàng ngay ngắn khi ra vào lớp.','Không chạy nhảy, la hét trong lớp và hành lang.'],[
   ['Muốn phát biểu trong giờ học, em làm gì?','🙋',['Giơ tay xin phép cô','Nói to ngay','Đứng dậy hét','Gõ bàn']],
   ['Ra về, các bạn nên đi thế nào?','🚶',['Xếp hàng, đi trật tự','Chen lấn, xô đẩy','Chạy thật nhanh','Hò hét']],
   ['Bạn bên cạnh nói chuyện trong giờ học. Em làm gì?','🤫',['Nhắc nhỏ: tập trung nghe cô nhé','Nói chuyện cùng bạn','Hét lên','Mách cả lớp']],
   ['Ở hành lang, em có nên đuổi nhau không?','🏃',['Không, dễ ngã và làm ồn','Có, rất vui','Có, nếu cô không thấy']],
   ['Giữ trật tự giúp lớp học thế nào?','📖',['Mọi người nghe rõ, học tốt hơn','Lớp buồn hơn','Không có tác dụng','Lớp bẩn hơn']]],
   null,'Tuần này, kể cho bố mẹ nghe 1 lần con giơ tay phát biểu ở lớp.'],
  ['dd13','Giữ gìn tài sản của trường, lớp',['Bàn ghế, sách thư viện, đồ dùng của lớp là của chung.','Không vẽ bậy lên bàn, tường. Không bẻ cây trong sân trường.','Dùng xong đồ chung, em cất lại đúng chỗ.'],[
   ['Bạn vẽ bậy lên bàn học. Việc đó có đúng không?','✏️',['Không đúng, làm bẩn bàn của lớp','Đúng, cho đẹp','Đúng, bàn là của bạn']],
   ['Mượn sách thư viện, em cần làm gì?','📕',['Giữ sách sạch, trả đúng hẹn','Xé tranh trong sách','Viết vào sách','Không trả']],
   ['Thấy vòi nước ở trường chảy mãi. Em làm gì?','🚰',['Khóa vòi lại','Nghịch nước','Mặc kệ','Mở to hơn']],
   ['Cây trong sân trường cần được thế nào?','🌳',['Được chăm sóc, không bẻ cành','Bị bẻ cành chơi','Bị trèo lên','Bị khắc chữ']],
   ['Dùng xong đồ dùng học tập của lớp, em làm gì?','🧩',['Cất lại gọn gàng đúng chỗ','Mang về nhà','Vứt ra sàn','Giấu đi']]],
   null,'Kiểm tra sách vở của con: bọc bìa, dán nhãn, giữ sạch, không có trang nào bị quăn hay rách.'],
  ['dd14','Giữ vệ sinh trường, lớp',['Bỏ rác vào thùng rác đúng nơi quy định.','Không vứt vỏ bánh kẹo ra sân, ngăn bàn.','Tham gia trực nhật: lau bảng, kê bàn ghế ngay ngắn.'],[
   ['Ăn xong bánh, vỏ bánh em để đâu?','🗑️',['Bỏ vào thùng rác','Vứt xuống gầm bàn','Nhét vào ngăn bàn','Ném ra sân']],
   ['Thấy giấy rác trong lớp. Em làm gì?','📄',['Nhặt bỏ vào thùng rác','Đá sang chỗ khác','Mặc kệ','Vứt thêm']],
   ['Đến phiên trực nhật, em làm gì?','🧽',['Lau bảng, kê bàn ghế ngay ngắn','Trốn về','Nhờ bạn làm hộ','Chơi đùa']],
   ['Lớp học sạch sẽ giúp gì?','✨',['Các bạn khỏe mạnh, học vui hơn','Không giúp gì','Làm cô buồn']],
   ['Đi vệ sinh xong ở trường, em làm gì?','🚽',['Dội nước và rửa tay sạch','Đi luôn','Nghịch nước','Để bẩn']]],
   null,'Ở nhà, con nhận việc đổ rác hoặc lau bàn học mỗi ngày trong 1 tuần.']]],
 ['Sinh hoạt nền nếp',[
  ['dd15','Gọn gàng, ngăn nắp',['Đồ dùng để đúng chỗ thì dễ tìm, nhà cửa đẹp hơn.','Chơi xong cất đồ chơi. Học xong cất sách vở vào cặp.','Giày dép để lên kệ, quần áo treo lên móc.'],[
   ['Chơi xong đồ chơi, em làm gì?','🧸',['Cất đồ chơi vào hộp','Để khắp nhà','Nhờ mẹ dọn hộ','Đá vào gầm giường']],
   ['Đi học về, giày dép em để ở đâu?','👟',['Xếp lên kệ giày','Ném giữa nhà','Để trên giường','Để ngoài mưa']],
   ['Vì sao nên gọn gàng, ngăn nắp?','🗂️',['Dễ tìm đồ, nhà đẹp và sạch','Để hay mất đồ','Không để làm gì']],
   ['Học xong, em làm gì với sách vở?','📚',['Cất vào cặp, soạn cho ngày mai','Để bừa trên bàn','Vứt dưới sàn','Làm rơi mất']],
   ['Bạn Tôm không tìm thấy bút vì để lung tung. Bạn nên làm gì?','🖊️',['Tập để đồ đúng chỗ','Mua bút mới liên tục','Mượn bút mãi','Khóc']]],
   null,'Tự dọn góc học tập và hộp đồ chơi gọn gàng. Bố mẹ chụp ảnh "trước và sau" cho con xem.'],
  ['dd16','Học tập, sinh hoạt đúng giờ',['Cùng bố mẹ làm thời gian biểu: giờ dậy, giờ học, giờ chơi, giờ ngủ.','Làm việc đúng giờ giúp em khỏe mạnh và học tốt.','Không thức khuya, không xem ti vi quá lâu.'],[
   ['Thời gian biểu dùng để làm gì?','🗓️',['Nhắc em lúc nào làm việc gì','Để trang trí','Để vẽ bậy','Không để làm gì']],
   ['Đến giờ đi ngủ mà phim đang hay. Em làm gì?','📺',['Tắt ti vi đi ngủ, mai xem tiếp','Xem đến khuya','Khóc đòi xem','Trốn xem']],
   ['Học sinh lớp 1 nên đi ngủ lúc nào?','😴',['Khoảng 9 giờ tối','12 giờ đêm','Khi nào buồn ngủ thì ngủ','Không cần ngủ']],
   ['Việc nào là sinh hoạt đúng giờ?','⏰',['Ăn cơm đúng bữa','Ăn vặt cả ngày','Bỏ bữa sáng','Ăn lúc nửa đêm']]],
   ['Thức dậy','Đánh răng, rửa mặt','Ăn sáng','Đi học'],'Cùng bố mẹ làm thời gian biểu, dán lên tường và làm theo đúng 3 ngày.']]],
 ['Tự giác làm việc của mình',[
  ['dd17','Tự giác học tập',['Tự giác học tập là tự học bài mà không cần ai nhắc.','Đến giờ học, em tự ngồi vào bàn, tự soạn sách vở.','Tự giác giúp em tiến bộ mỗi ngày.'],[
   ['Đến giờ học bài. Em làm gì?','⏰',['Tự ngồi vào bàn học','Đợi mẹ nhắc mấy lần','Trốn đi chơi','Xem ti vi']],
   ['Bạn nào tự giác học tập?','🧒',['Bạn tự soạn cặp sách mỗi tối','Bạn chờ mẹ soạn hộ','Bạn hay quên sách vở','Bạn chép bài của bạn']],
   ['Cô chưa kiểm tra bài. Em có làm bài không?','📝',['Có, em vẫn làm đầy đủ','Không, cô không biết đâu','Làm qua loa cho xong']],
   ['Tự giác học tập giúp em thế nào?','🌱',['Học giỏi hơn mỗi ngày','Không có ích','Bị mệt','Bị điểm kém']],
   ['Em đang học thì em bé rủ chơi. Em nói gì?','👶',['Chị học xong sẽ chơi với em nhé','Bỏ học chơi luôn','Đuổi em đi','Khóc']]],
   null,'Tự vào bàn học đúng giờ, không cần bố mẹ nhắc, trong 5 ngày. Tự mở app học cũng được tính!'],
  ['dd18','Tự giác tham gia các hoạt động ở trường',['Ở trường có nhiều hoạt động: văn nghệ, thể dục, trồng cây, trực nhật.','Em tự giác tham gia, không đợi cô phải gọi.','Tham gia hoạt động giúp em khỏe, vui và có thêm bạn.'],[
   ['Lớp tập văn nghệ. Em làm gì?','🎤',['Xung phong tham gia','Trốn về','Trêu các bạn','Đứng xem rồi chê']],
   ['Giờ thể dục, em tập thế nào?','🤸',['Tập đều, đúng động tác','Đứng im','Chạy đi chơi','Nói chuyện']],
   ['Trường tổ chức trồng cây. Em làm gì?','🌱',['Cùng các bạn trồng và tưới cây','Ở nhà ngủ','Bẻ cây','Chỉ đứng xem']],
   ['Vì sao nên tham gia hoạt động ở trường?','🎉',['Khỏe mạnh, vui và có thêm bạn','Không để làm gì','Để bị mệt']],
   ['Cô cần một bạn giúp phát vở. Em làm gì?','🙋',['Giơ tay xin giúp cô','Cúi mặt xuống','Chạy ra ngoài']]],
   null,'Tuần này, con xung phong 1 việc ở lớp (phát vở, trực nhật, hát, trả lời câu hỏi) và kể lại cho bố mẹ.'],
  ['dd19','Tự giác làm việc nhà',['Em làm việc nhà vừa sức: lau bàn, xếp bát đũa, gấp quần áo, tưới cây.','Tự giác làm, không đợi bố mẹ nhắc.','Làm việc nhà giúp em khéo tay và biết yêu thương gia đình.'],[
   ['Việc nhà nào vừa sức với em?','🧹',['Xếp bát đũa, tưới cây','Nấu cơm bằng bếp ga','Trèo cao lau đèn','Cắm điện nồi cơm']],
   ['Mẹ đang bận. Em làm gì?','👩',['Tự làm việc nhà quen thuộc','Đòi mẹ chơi','Bày bừa thêm','Kêu đói']],
   ['Ăn cơm xong, em làm gì?','🍽️',['Mang bát của mình ra chỗ rửa','Bỏ đi chơi luôn','Để bát trên sàn']],
   ['Vì sao nên làm việc nhà?','🏠',['Giúp đỡ gia đình, em thêm khéo tay','Chỉ để được khen','Không cần làm']],
   ['Cây trong nhà bị héo. Em làm gì?','🪴',['Tưới nước cho cây','Nhổ cây đi','Mặc kệ']]],
   null,'Nhận 1 việc nhà cố định (tưới cây, lau bàn, xếp dép) và làm mỗi ngày trong 1 tuần không cần nhắc.']]],
 ['Thật thà',[
  ['dd20','Không nói dối',['Nói dối là nói điều không đúng sự thật.','Nói dối làm mọi người mất lòng tin.','Em luôn nói thật, kể cả khi em mắc lỗi.'],[
   ['Em làm đổ nước ra bàn. Mẹ hỏi. Em nói gì?','💧',['Con làm đổ ạ, con xin lỗi mẹ','Tại con mèo','Không phải con','Im lặng']],
   ['Vì sao không nên nói dối?','🙅',['Mọi người sẽ không tin mình nữa','Vì dễ bị lộ thôi','Nói dối cũng được']],
   ['Cậu bé chăn cừu nhiều lần kêu "Sói đến!" để đùa. Khi sói đến thật thì sao?','🐺',['Không ai tin cậu nữa','Mọi người chạy đến ngay','Sói tự bỏ đi']],
   ['Em chưa làm bài tập. Cô hỏi. Em nói gì?','📝',['Con chưa làm ạ, con xin lỗi cô','Con làm rồi mà quên vở','Tại em bé xé mất','Nói dối cô']],
   ['Bạn nào đáng khen?','⭐',['Bạn nói thật dù sợ bị mắng','Bạn đổ lỗi cho người khác','Bạn giấu chuyện']]],
   null,'Kể cho bố mẹ 1 chuyện thật con đã làm chưa đúng trong tuần. Bố mẹ khen con vì đã nói thật.'],
  ['dd21','Không tự ý lấy và sử dụng đồ của người khác',['Muốn dùng đồ của người khác, em phải hỏi mượn.','Mượn xong phải giữ gìn, trả lại và nói lời cảm ơn.','Không tự ý lấy đồ, kể cả khi em rất thích.'],[
   ['Em thích bút màu của bạn. Em làm gì?','🖍️',['Hỏi mượn bạn','Lấy khi bạn không để ý','Giằng của bạn','Giấu bút của bạn']],
   ['Mượn đồ xong, em làm gì?','🤝',['Trả lại và nói cảm ơn','Giữ luôn','Làm hỏng rồi vứt','Cho người khác']],
   ['Muốn dùng điện thoại của mẹ, em làm gì?','📱',['Xin phép mẹ trước','Tự lấy dùng','Lấy trốn vào phòng']],
   ['Bạn lấy kẹo của bạn khác mà không hỏi. Như vậy thế nào?','🍬',['Sai, phải hỏi và được đồng ý','Đúng, vì kẹo ngon','Không sao cả']],
   ['Câu hỏi mượn nào lịch sự?','💬',['Cho mình mượn thước nhé, cảm ơn bạn!','Đưa thước đây!','Thước này của tớ','Lấy nhé']]],
   null,'Khi muốn dùng đồ của bố mẹ hay anh chị, con luôn hỏi mượn, trả lại đúng chỗ và nói cảm ơn.'],
  ['dd22','Nhặt được của rơi trả lại người đánh mất',['Nhặt được đồ của người khác, em không giữ làm của mình.','Em tìm cách trả lại, hoặc đưa cho cô giáo, chú bảo vệ, người lớn.','Trả lại của rơi là người thật thà, đáng khen.'],[
   ['Em nhặt được cái bút ở lớp. Em làm gì?','🖊️',['Hỏi của ai để trả, hoặc đưa cô giáo','Giữ làm của mình','Vứt đi','Giấu vào cặp']],
   ['Nhặt được ví tiền ở công viên. Em làm gì?','👛',['Đưa bố mẹ để tìm trả người mất','Lấy tiền mua kẹo','Vứt vào thùng rác','Mang về cất']],
   ['Người trả lại của rơi là người thế nào?','⭐',['Thật thà, đáng khen','Ngốc nghếch','Không có gì đặc biệt']],
   ['Người mất đồ được trả lại sẽ thấy thế nào?','😊',['Vui và biết ơn','Buồn hơn','Tức giận']],
   ['Ở siêu thị, em thấy túi đồ ai để quên. Em làm gì?','🛍️',['Báo cô thu ngân hoặc chú bảo vệ','Mang về nhà','Mở túi ra lấy đồ']]],
   null,'Chơi trò "Của rơi": bố mẹ đánh rơi 1 đồ vật, con nhặt và trả lại đúng người bằng lời nói lịch sự.'],
  ['dd23','Biết nhận lỗi',['Ai cũng có lúc mắc lỗi.','Khi mắc lỗi, em xin lỗi và sửa lỗi.','Em nói: "Con xin lỗi, lần sau con sẽ cẩn thận hơn".'],[
   ['Em vô tình va vào bạn làm bạn ngã. Em làm gì?','🧒',['Đỡ bạn dậy và xin lỗi bạn','Chạy đi','Cười','Đổ tại bạn']],
   ['Em làm vỡ cốc. Em nói gì với mẹ?','🥤',['Con xin lỗi mẹ, con làm vỡ cốc ạ','Không phải con','Tại cái cốc','Giấu mảnh vỡ']],
   ['Xin lỗi xong, em cần làm gì nữa?','🔧',['Sửa lỗi và cẩn thận hơn','Không cần làm gì','Làm lại lỗi đó']],
   ['Bạn nào biết nhận lỗi?','⭐',['Bạn nói "Mình xin lỗi, lần sau mình cẩn thận"','Bạn đổ lỗi cho bạn khác','Bạn cãi lại']],
   ['Biết nhận lỗi giúp em thế nào?','🌱',['Mọi người tin yêu, em tiến bộ','Bị mọi người ghét','Không có ích']]],
   null,'Khi mắc lỗi trong tuần này, con tự xin lỗi và sửa lỗi. Bố mẹ ghi lại 1 lần con làm được.']]],
 ['Phòng, tránh tai nạn, thương tích',[
  ['dd24','Phòng, tránh tai nạn giao thông',['Đi bộ trên vỉa hè, sang đường ở vạch kẻ trắng và nắm tay người lớn.','Đèn đỏ dừng lại, đèn xanh mới được đi.','Ngồi xe máy phải đội mũ bảo hiểm, ngồi ngay ngắn, bám chắc.'],[
   ['Ngồi sau xe máy, em phải làm gì?','🛵',['Đội mũ bảo hiểm, ngồi ngay ngắn','Đứng lên xe','Vẫy tay chơi','Không đội mũ']],
   ['Đèn giao thông màu đỏ nghĩa là gì?','🔴',['Dừng lại','Đi thật nhanh','Chạy qua đường']],
   ['Em sang đường ở đâu?','🚸',['Ở vạch kẻ trắng, cùng người lớn','Ở bất cứ đâu','Chạy qua giữa các xe']],
   ['Chơi đá bóng ở đâu thì an toàn?','⚽',['Ở sân chơi, công viên','Dưới lòng đường','Gần đường tàu']],
   ['Đi bộ, em đi ở đâu?','🚶',['Trên vỉa hè','Giữa lòng đường','Trên dải phân cách']]],
   null,'Khi ra đường cùng bố mẹ, con tự chỉ đèn giao thông và vạch sang đường, nói đúng: đỏ dừng, xanh đi. Luôn tự đội mũ bảo hiểm.'],
  ['dd25','Phòng, tránh đuối nước',['Không chơi gần ao, hồ, sông, suối, giếng, bể nước.','Chỉ đi bơi khi có người lớn trông.','Thấy bạn bị đuối nước: hô to gọi người lớn, không tự nhảy xuống cứu.'],[
   ['Em có được tự đi tắm ao, hồ không?','🌊',['Không, rất nguy hiểm','Có, nếu trời nóng','Có, nếu đi với bạn nhỏ']],
   ['Đi bơi, em cần gì?','🏊',['Có người lớn trông, mặc áo phao','Đi một mình','Bơi chỗ nước sâu']],
   ['Thấy bạn ngã xuống nước, em làm gì?','📣',['Hô to gọi người lớn đến cứu','Nhảy xuống cứu bạn','Chạy về nhà trốn']],
   ['Chỗ nào nguy hiểm, em không chơi?','⚠️',['Bờ ao, bờ sông, cạnh giếng','Sân chơi có rào','Phòng khách']],
   ['Xô, chậu nước lớn trong nhà có nguy hiểm với em bé không?','🪣',['Có, cần đậy nắp cẩn thận','Không bao giờ','Chỉ nguy hiểm với cá']]],
   null,'Cùng bố mẹ đi quanh nhà và khu phố, chỉ ra 3 chỗ có nước nguy hiểm cần tránh. Nếu có thể, bắt đầu học bơi.'],
  ['dd26','Phòng, tránh bỏng',['Tránh xa bếp đang nấu, nồi nước sôi, bàn là, phích nước nóng.','Không nghịch diêm, bật lửa.','Bị bỏng nhẹ: báo người lớn, xả nước mát vào chỗ bỏng.'],[
   ['Mẹ đang nấu ăn. Em có nên chạy vào bếp nghịch không?','🔥',['Không, dễ bị bỏng','Có','Có, nếu mẹ không thấy']],
   ['Em thấy bật lửa trên bàn. Em làm gì?','🕯️',['Không nghịch, báo người lớn cất đi','Bật thử','Mang đi chơi']],
   ['Bị bỏng nhẹ, việc đầu tiên em làm là gì?','🚰',['Báo người lớn, xả nước mát vào chỗ bỏng','Bôi kem đánh răng','Giấu đi không nói']],
   ['Đồ vật nào nóng, dễ gây bỏng?','♨️',['Bàn là đang cắm điện, phích nước sôi','Cái gối','Quyển sách']],
   ['Bát canh vừa múc ra rất nóng. Em làm gì?','🍲',['Đợi nguội bớt rồi ăn','Uống ngay','Bưng chạy']]],
   null,'Cùng bố mẹ chỉ ra 3 đồ vật nóng trong nhà cần tránh, và nhắc lại cách xử lý khi bị bỏng nhẹ.'],
  ['dd27','Phòng, tránh thương tích do ngã',['Không leo trèo lên cao: cây, lan can, ghế chồng lên nhau.','Không chạy trên sàn ướt, cầu thang.','Đi giày dép vừa chân, buộc dây giày cẩn thận.'],[
   ['Muốn lấy đồ trên nóc tủ, em làm gì?','🗄️',['Nhờ người lớn lấy giúp','Chồng ghế trèo lên','Leo lên tủ']],
   ['Sàn nhà vừa lau còn ướt. Em làm gì?','💦',['Đi chậm hoặc đợi sàn khô','Chạy nhảy','Trượt chơi']],
   ['Đi cầu thang, em đi thế nào?','🪜',['Bám tay vịn, đi từng bậc','Nhảy nhiều bậc','Chạy đuổi nhau']],
   ['Chỗ nào em không được leo trèo?','⚠️',['Lan can, cửa sổ, cây cao','Cầu trượt ở sân chơi có người lớn','Ghế ngồi đúng cách']],
   ['Dây giày bị tuột. Em làm gì?','👟',['Dừng lại buộc dây giày','Kệ, chạy tiếp','Giẫm lên dây']]],
   null,'Tự buộc dây giày (hoặc dán quai dép) và đi cầu thang bám tay vịn mỗi ngày trong 1 tuần.'],
  ['dd28','Phòng, tránh điện giật',['Không chạm tay vào ổ điện, dây điện hở.','Không cắm, rút phích điện khi tay ướt.','Tránh xa cột điện, trạm điện; không thả diều gần dây điện.'],[
   ['Em có được chọc đồ vật vào ổ điện không?','🔌',['Không, rất nguy hiểm','Có, để thử','Có, nếu đồ vật nhỏ']],
   ['Tay đang ướt, em có nên cắm sạc không?','💧',['Không, lau khô tay và nhờ người lớn','Có','Có, cắm thật nhanh']],
   ['Thả diều ở đâu thì an toàn?','🪁',['Bãi đất rộng, xa dây điện','Gần cột điện','Trên mái nhà']],
   ['Thấy dây điện đứt rơi xuống đất. Em làm gì?','⚡',['Tránh xa và báo người lớn','Nhặt lên xem','Giẫm lên']],
   ['Thấy bạn bị điện giật. Em làm gì?','📣',['Không chạm vào bạn, gọi to người lớn','Kéo tay bạn ra','Đứng xem']]],
   null,'Cùng bố mẹ tìm các ổ điện trong nhà và nhắc lại 3 điều không được làm với điện.'],
  ['dd29','Phòng, tránh ngộ độc thực phẩm',['Ăn chín, uống sôi. Rửa tay trước khi ăn.','Không ăn đồ ôi thiu, có mùi lạ, quá hạn.','Không tự ý ăn quả lạ, uống thuốc hay nước trong chai lạ.'],[
   ['Thức ăn có mùi lạ, bị mốc. Em làm gì?','🤢',['Không ăn và báo người lớn','Ăn thử','Cho bạn ăn']],
   ['Em thấy chai nước lạ trong nhà kho. Em làm gì?','🧴',['Không uống, hỏi người lớn','Uống thử','Mở ra nếm']],
   ['Uống nước thế nào là an toàn?','💧',['Nước đã đun sôi hoặc nước đóng chai sạch','Nước lã ở vòi','Nước mưa']],
   ['Trước khi ăn, em cần làm gì?','🧼',['Rửa tay sạch','Không cần rửa','Lau tay vào áo']],
   ['Ăn xong thấy đau bụng, buồn nôn. Em làm gì?','🤒',['Báo ngay bố mẹ hoặc cô giáo','Giấu không nói','Ăn thêm']]],
   null,'Cùng mẹ đi chợ hoặc siêu thị: con tìm hạn sử dụng trên hộp sữa và chọn hoa quả tươi.'],
  ['dd30','Phòng, tránh xâm hại',['Cơ thể em là của em. Vùng đồ lót che kín là vùng riêng tư, không ai được chạm vào.','Nếu ai làm em thấy sợ, khó chịu: nói to "Không!", đi ngay đến chỗ đông người và kể với bố mẹ.','Không đi theo, không nhận quà của người lạ. Không giữ những "bí mật" làm em sợ.'],[
   ['Người lạ cho kẹo và rủ em đi chơi. Em làm gì?','🍭',['Nói "Không!" và đến ngay chỗ bố mẹ, cô giáo','Đi theo','Nhận kẹo rồi đi']],
   ['Vùng nào trên cơ thể là vùng riêng tư?','🩲',['Vùng mặc đồ lót che kín','Bàn tay','Mái tóc']],
   ['Ai đó làm em sợ và bảo em giữ bí mật. Em làm gì?','🗣️',['Kể ngay với bố mẹ hoặc cô giáo','Giữ bí mật','Không nói với ai']],
   ['Em kể chuyện với ai khi gặp điều không an toàn?','👨‍👩‍👧',['Bố mẹ, cô giáo','Người lạ trên mạng','Người mới gặp']],
   ['Ai đó chạm vào em làm em khó chịu. Em nói gì?','✋',['"Không! Tôi không thích!" rồi đi ngay','Im lặng','Cười']]],
   null,'Cùng bố mẹ kể tên 3 người con tin tưởng để kể chuyện, và tập nói to "Không!" rồi đi đến chỗ an toàn.']]]
];
(function(){
  DD.forEach(([tn,ls])=>{const tp=topic('dd',tn);ls.forEach(([id,title,learn,qs,order,real])=>addLesson(tp,'dd',{id,title,learnLines:learn,
    gen:()=>{const out=shuffle(qs).map(([p,pic,o])=>Q(p,o[0],o.slice(1),{visual:`<div class="pic-lg">${pic}</div>`,cols:1,optLang:'vi'}));
      if(order)out.push({type:'order',prompt:'Xếp các bước theo đúng thứ tự',items:order,vertical:true});return out;},real}));});
})();
